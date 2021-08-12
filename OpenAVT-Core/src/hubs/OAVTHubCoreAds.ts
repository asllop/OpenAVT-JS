import { OAVTAction, OAVTAttribute, OAVTEvent, OAVTInstrument } from ".."
import { OAVTTrackerInterface } from ".."
import { OAVTHubCore } from "./OAVTHubCore"

/**
 * OpenAVT hub for generic content players with ads.
 */
export class OAVTHubCoreAds extends OAVTHubCore {
    private countAds = 0

    override processEvent(event: OAVTEvent, tracker: OAVTTrackerInterface): OAVTEvent {
        if (event.getAction().getActionName() == OAVTAction.AdBreakBegin.getActionName()) {
            if (!tracker.state.inAdBreak) {
                this.setInAdBreakState(true)
            }
            else {
                return null
            }
        }
        else if (event.getAction().getActionName() == OAVTAction.AdBreakFinish.getActionName()) {
            if (tracker.state.inAdBreak) {
                this.setInAdBreakState(false)
            }
            else {
                return null
            }
        }
        else if (event.getAction().getActionName() == OAVTAction.AdBegin.getActionName()) {
            if (!tracker.state.inAd) {
                this.instrument.startPing(tracker.trackerId, 30000)
                this.setInAdState(true)
                this.countAds++
            }
            else {
                return null
            }
        }
        else if (event.getAction().getActionName() == OAVTAction.AdFinish.getActionName()) {
            if (tracker.state.inAd) {
                this.instrument.stopPing(tracker.trackerId)
                this.setInAdState(false)
            }
            else {
                return null
            }
        }
        else if (event.getAction().getActionName() == OAVTAction.End.getActionName()) {
            // To avoid content end when an ad break happens
            if (tracker.state.inAdBreak) {
                return null
            }
        }
        else if (event.getAction().getActionName() == OAVTAction.AdPauseBegin.getActionName()) {
            if (!tracker.state.isPaused) {
                tracker.state.isPaused = true
            }
            else {
                return null
            }
        }
        else if (event.getAction().getActionName() == OAVTAction.AdPauseFinish.getActionName()) {
            if (tracker.state.isPaused) {
                tracker.state.isPaused = false
            }
            else {
                return null
            }
        }
        
        event.setAttribute(OAVTAttribute.inAdBreakBlock, tracker.state.inAdBreak)
        event.setAttribute(OAVTAttribute.inAdBlock, tracker.state.inAd)
        event.setAttribute(OAVTAttribute.countAds, this.countAds)
        
        // Get current content video position
        Object.keys(this.instrument.getTrackers()).forEach(trackerId => {
            let isAdsTracker: boolean = this.instrument.callGetter(OAVTAttribute.isAdsTracker, this.instrument.getTracker(+trackerId))
            if (isAdsTracker != null) {
                if (!isAdsTracker) {
                    this.instrument.useGetter(OAVTAttribute.position, event, tracker)
                }
            }
        })
        
        return super.processEvent(event, tracker)
    }
    
    override instrumentReady(instrument: OAVTInstrument) {
        super.instrumentReady(instrument)
    }
    
    /**
     * Set inAd state for all trackers of the instrument
     * 
     * @param state inAd state.
     */
    setInAdState(state: boolean) {
        Object.keys(this.instrument.getTrackers()).forEach(trackerId => {
            this.instrument.getTracker(+trackerId).state.inAd = state
        })
    }
    
    /**
     * Set inAdBreak state for all trackers of the instrument
     * 
     * @param state inAdBreak state.
     */
    setInAdBreakState(state: boolean) {
        Object.keys(this.instrument.getTrackers()).forEach(trackerId => {
            this.instrument.getTracker(+trackerId).state.inAdBreak = state
        })
    }
}