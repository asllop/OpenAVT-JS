import { OAVTEvent, OAVTTrackerInterface, OAVTInstrument, OAVTAttribute, OAVTAction } from "..";
import { OAVTHubInterface } from "../interfaces/OAVTHubInterface";

/**
 * OpenAVT hub for generic content players.
 */
export class OAVTHubCore implements OAVTHubInterface {
    private countErrors = 0
    private countStarts = 0
    private accumPauseTime = 0
    private accumSeekTime = 0
    private accumBufferTime = 0
    private lastBufferBeginInPauseBlock = false
    private lastBufferBeginInSeekBlock = false
    private streamId : string = null
    private playbackId : string = null
    private timestampOfLastEventOnPlayback : number = 0
    protected instrument: OAVTInstrument = null

    processEvent(event: OAVTEvent, tracker: OAVTTrackerInterface): OAVTEvent {
        // In case of playing again the same stream after it finished
        if (tracker.state.didFinish) {
            tracker.state.didStart = false
            tracker.state.isPaused = false
            tracker.state.isBuffering = false
            tracker.state.isSeeking = false
            tracker.state.didFinish = false
        }
        
        this.initPlaybackId(event)
        
        if (tracker.state.didStart && !tracker.state.isPaused && !tracker.state.isSeeking && !tracker.state.isBuffering) {
            event.setAttribute(OAVTAttribute.deltaPlayTime, new Date().getTime() - this.timestampOfLastEventOnPlayback)
        }
        
        if (!this.acceptOrRejectEvent(event, tracker)) {
            return null
        }
        
        // Once we get here, the event has been accepted by the Hub
        
        this.timestampOfLastEventOnPlayback = new Date().getTime()
        
        event.setAttribute(OAVTAttribute.countErrors, this.countErrors)
        event.setAttribute(OAVTAttribute.countStarts, this.countStarts)
        event.setAttribute(OAVTAttribute.accumPauseTime, this.accumPauseTime)
        event.setAttribute(OAVTAttribute.accumBufferTime, this.accumBufferTime)
        event.setAttribute(OAVTAttribute.accumSeekTime, this.accumSeekTime)
        // In case the BufferBegin happens inside a block, we want the BufferFinish be flagged as belonging to the same block, even if it happened outside of it
        if (event.getAction().getActionName() == OAVTAction.BufferFinish.getActionName()) {
            event.setAttribute(OAVTAttribute.inPauseBlock, this.lastBufferBeginInPauseBlock)
            event.setAttribute(OAVTAttribute.inSeekBlock, this.lastBufferBeginInSeekBlock)
        }
        else {
            event.setAttribute(OAVTAttribute.inPauseBlock, tracker.state.isPaused)
            event.setAttribute(OAVTAttribute.inSeekBlock, tracker.state.isSeeking)
        }
        event.setAttribute(OAVTAttribute.inBufferBlock, tracker.state.isBuffering)
        event.setAttribute(OAVTAttribute.inPlaybackBlock, tracker.state.didStart && !tracker.state.didFinish)
        
        if (this.streamId != null) {
            event.setAttribute(OAVTAttribute.streamId, this.streamId)
        }
        
        if (this.playbackId != null) {
            event.setAttribute(OAVTAttribute.playbackId, this.playbackId)
        }
        
        this.updatePlaybackId(event)

        return event
    }

    instrumentReady(instrument: OAVTInstrument): void {
        this.instrument = instrument
    }

    endOfService(): void {}

    /**
     * Setup ping timer.
     * 
     * @param tracker Tracker instance.
     */
    startPing(tracker: OAVTTrackerInterface) {
        this.instrument.startPing(tracker.trackerId, 30000)
    }

    /**
     * Process event, accepting or rejecting, and mutate states if necessary.
     * 
     * @param event Event object.
     * @param tracker Tracker instance.
     * @returns True if accept, false if reject.
     */
    acceptOrRejectEvent(event: OAVTEvent, tracker: OAVTTrackerInterface): Boolean {
        switch (event.getAction().getActionName()) {
            case OAVTAction.MediaRequest.getActionName():
                if (!tracker.state.didMediaRequest) {
                    tracker.state.didMediaRequest = true
                }
                else {
                    return false
                }
                break
            case OAVTAction.PlayerSet.getActionName():
                if (!tracker.state.didPlayerSet) {
                    tracker.state.didPlayerSet = true
                }
                else {
                    return false
                }
                break
            case OAVTAction.StreamLoad.getActionName():
                if (!tracker.state.didStreamLoad) {
                    tracker.state.didStreamLoad = true
                    this.streamId = this.generateUUID()
                }
                else {
                    return false
                }
                break
            case OAVTAction.Start.getActionName():
                if (!tracker.state.didStart) {
                    this.startPing(tracker)
                    tracker.state.didStart = true
                    this.countStarts++
                }
                else {
                    return false
                }
                break
            case OAVTAction.PauseBegin.getActionName():
                if (tracker.state.didStart && !tracker.state.isPaused) {
                    tracker.state.isPaused = true
                }
                else {
                    return false
                }
                break
            case OAVTAction.PauseFinish.getActionName():
                if (tracker.state.didStart && tracker.state.isPaused) {
                    tracker.state.isPaused = false
                    let timeSincePauseBegin = event.getAttribute(OAVTAction.PauseBegin.getTimeAttribute())
                    this.accumPauseTime = this.accumPauseTime + timeSincePauseBegin
                }
                else {
                    return false
                }
                break
            case OAVTAction.BufferBegin.getActionName():
                if (!tracker.state.isBuffering) {
                    tracker.state.isBuffering = true
                    this.lastBufferBeginInPauseBlock = tracker.state.isPaused
                    this.lastBufferBeginInSeekBlock = tracker.state.isSeeking
                }
                else {
                    return false
                }
                break
            case OAVTAction.BufferFinish.getActionName():
                if (tracker.state.isBuffering) {
                    tracker.state.isBuffering = false
                    let timeSinceBufferBegin = event.getAttribute(OAVTAction.BufferBegin.getTimeAttribute())
                    this.accumBufferTime = this.accumBufferTime + timeSinceBufferBegin
                }
                else {
                    return false
                }
                break
            case OAVTAction.SeekBegin.getActionName():
                if (!tracker.state.isSeeking) {
                    tracker.state.isSeeking = true
                }
                else {
                    return false
                }
                break
            case OAVTAction.SeekFinish.getActionName():
                if (tracker.state.isSeeking) {
                    tracker.state.isSeeking = false
                    let timeSinceSeekBegin = event.getAttribute(OAVTAction.SeekBegin.getTimeAttribute())
                    this.accumSeekTime = this.accumSeekTime + timeSinceSeekBegin
                }
                else {
                    return false
                }
                break
            case OAVTAction.End.getActionName():
            case OAVTAction.Stop.getActionName():
            case OAVTAction.Next.getActionName():
                if (tracker.state.didStart && !tracker.state.didFinish) {
                    this.instrument.stopPing(tracker.trackerId)
                    tracker.state.didFinish = true
                }
                else {
                    return false
                }
                break
            case OAVTAction.Error.getActionName():
                this.countErrors++
                break
            default:
                return true
        }

        return true
    }

    private initPlaybackId(event: OAVTEvent) {
        if (event.getAction().getActionName() == OAVTAction.MediaRequest.getActionName() || event.getAction().getActionName() == OAVTAction.StreamLoad.getActionName()) {
            if (this.playbackId == null) {
                this.playbackId = this.generateUUID()
            }
        }
    }
    
    private updatePlaybackId(event: OAVTEvent) {
        if (event.getAction().getActionName() == OAVTAction.End.getActionName() ||event.getAction().getActionName() == OAVTAction.Stop.getActionName() || event.getAction().getActionName() == OAVTAction.Next.getActionName()) {
            this.playbackId = this.generateUUID()
        }
    }

    private generateUUID(): string {
        return Math.floor(Math.random() * 1000000000).toString()
    }
}