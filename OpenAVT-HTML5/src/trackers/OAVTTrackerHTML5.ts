import { OAVTAction, OAVTEvent, OAVTAttribute, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

/**
 * OpenAVT HTML5 tracker.
 */
export class OAVTTrackerHTML5 implements OAVTTrackerInterface {

    private player: any = null
    private instrument: OAVTInstrument = null
    private lastResolutionHeight = 0
    private lastResolutionWidth = 0
    private lastErr: any = null

    /**
     * Build an OpenAVT HTML5 tracker.
     * 
     * @param player HTML5 player instance.
     */
    constructor(player: Object = null) {
        if (player != null) {
            this.setPlayer(player)
        }
    }

    initEvent(event: OAVTEvent): OAVTEvent {
        if (event.getAction().getActionName() == OAVTAction.Error.getActionName()) {
            //event.setAttribute(OAVTAttribute.errorDescription, this.lastErr.message)
            //event.setAttribute(OAVTAttribute.errorCode, this.lastErr.code)
            //event.setAttribute(OAVTAttribute.errorType, this.lastErr.type)
        }
        return event
    }
    
    trackerId: number
    state: OAVTState = new OAVTState()

    instrumentReady(instrument: OAVTInstrument): void {
        if (this.instrument == null) {
            this.instrument = instrument
            this.registerGetters()
            this.instrument.emit(OAVTAction.TrackerInit, this)
        }
    }

    endOfService(): void {
        this.unregisterListeners()
    }

    /**
     * Set player.
     * 
     * @param player HTML5 player instance.
     */
    setPlayer(player: Object) {
        if (this.player != null) {
            this.unregisterListeners()
        }
        this.player = player
        this.instrument?.emit(OAVTAction.PlayerSet, this)
        this.registerListeners()
    }

    /**
     * Register attribute getters.
     */
    registerGetters() {
        this.instrument.registerGetter(OAVTAttribute.trackerTarget, this.getTrackerTarget.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.position, this.getPosition.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.duration, this.getDuration.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.resolutionHeight, this.getResolutionHeight.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.resolutionWidth, this.getResolutionWidth.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.isMuted, this.getIsMuted.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.volume, this.getVolume.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.source, this.getSource.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.language, this.getLanguage.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.isAdsTracker, this.getIsAdsTracker.bind(this), this)
    }

    /**
     * Register HTML5 event listeners.
     */
    registerListeners () {
        this.player.addEventListener('loadstart', this.loadstartListener.bind(this))
        this.player.addEventListener('loadedmetadata', this.loadedmetadataListener.bind(this))
        this.player.addEventListener('loadeddata', this.loadeddataListener.bind(this))
        this.player.addEventListener('canplay', this.canplayListener.bind(this))
        this.player.addEventListener('play', this.playListener.bind(this))
        this.player.addEventListener('playing', this.playingListener.bind(this))
        this.player.addEventListener('pause', this.pauseListener.bind(this))
        this.player.addEventListener('seeking', this.seekingListener.bind(this))
        this.player.addEventListener('seeked', this.seekedListener.bind(this))
        this.player.addEventListener('error', this.errorListener.bind(this))
        this.player.addEventListener('ended', this.endedListener.bind(this))
        this.player.addEventListener('waiting', this.waitingListener.bind(this))
    }

    /**
     * Unregister HTML5 event listeners.
     */
    unregisterListeners () {
        this.player.removeEventListener('loadstart', this.loadstartListener)
        this.player.removeEventListener('loadedmetadata', this.loadedmetadataListener)
        this.player.removeEventListener('loadeddata', this.loadeddataListener)
        this.player.removeEventListener('canplay', this.canplayListener)
        this.player.removeEventListener('play', this.playListener)
        this.player.removeEventListener('playing', this.playingListener)
        this.player.removeEventListener('pause', this.pauseListener)
        this.player.removeEventListener('seeking', this.seekingListener)
        this.player.removeEventListener('seeked', this.seekedListener)
        this.player.removeEventListener('error', this.errorListener)
        this.player.removeEventListener('ended', this.endedListener)
        this.player.removeEventListener('waiting', this.waitingListener)
    }

    // Event listeners
    
    loadstartListener() {
        OAVTLog.verbose("HTML5 event = loadstart")
    }

    loadedmetadataListener() {
        OAVTLog.verbose("HTML5 event = loadedmetadata")
    }

    loadeddataListener() {
        OAVTLog.verbose("HTML5 event = loadeddata")
    }

    canplayListener() {
        OAVTLog.verbose("HTML5 event = canplay")
    }

    playListener() {
        OAVTLog.verbose("HTML5 event = play")
    }

    playingListener() {
        OAVTLog.verbose("HTML5 event = playing")
    }

    pauseListener() {
        OAVTLog.verbose("HTML5 event = pause")
    }

    seekingListener() {
        OAVTLog.verbose("HTML5 event = seeking")
    }

    seekedListener() {
        OAVTLog.verbose("HTML5 event = seeked")
    }

    errorListener() {
        OAVTLog.verbose("HTML5 event = error")
    }

    endedListener() {
        OAVTLog.verbose("HTML5 event = ended")
    }

    waitingListener() {
        OAVTLog.verbose("HTML5 event = waiting")
    }

    // Attribute getters

    getTrackerTarget() {
        return "HTML5"
    }

    getPosition() {
        return 0
    }

    getDuration() {
        return 0
    }

    getResolutionHeight() {
        return 0
    }

    getResolutionWidth() {
        return 0
    }

    getIsMuted() {
        return false
    }

    getVolume() {
        return 0
    }

    getSource() {
        return ""
    }

    getLanguage() {
        return ""
    }

    getIsAdsTracker() {
        return false
    }

    private checkResolutionChange() {
        let currH = this.getResolutionHeight()
        let currW = this.getResolutionWidth()
        if (this.lastResolutionWidth == 0 || this.lastResolutionHeight == 0) {
            this.lastResolutionHeight = currH
            this.lastResolutionWidth = currW
        }
        else {
            let lastMul = this.lastResolutionHeight * this.lastResolutionWidth
            let currMul = currH * currW
            
            if (lastMul > currMul) {
                this.instrument?.emit(OAVTAction.QualityChangeDown, this)
            }
            else if (lastMul < currMul) {
                this.instrument?.emit(OAVTAction.QualityChangeUp, this)
            }
            
            this.lastResolutionHeight = currH
            this.lastResolutionWidth = currW
        }
    }
}