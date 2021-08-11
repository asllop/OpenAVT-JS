import { OAVTAction, OAVTAttribute, OAVTEvent, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

/**
 * OpenAVT JWPlayer Ads tracker.
 */
export class OAVTTrackerJWPlayerAds implements OAVTTrackerInterface {

    private player: any = null
    private instrument: OAVTInstrument = null

    /**
     * Build an OpenAVT JWPlayer Ads tracker.
     * 
     * @param player JWPlayer instance.
     */
    constructor(player: Object = null) {
        if (player != null) {
            this.setPlayer(player)
        }
    }

    initEvent(event: OAVTEvent): OAVTEvent {
        return event
    }
    
    trackerId: number;
    state: OAVTState = new OAVTState();

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
     * @param player JWPlayer instance.
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
    }

    /**
     * Register JWPlayer event listeners.
     */
    registerListeners () {
        this.player.on('adBreakStart', this.adBreakStartListener.bind(this))
        this.player.on('adBreakEnd', this.adBreakEndListener.bind(this))
        this.player.on('adStarted', this.adStartedListener.bind(this))
        this.player.on('adComplete', this.adCompleteListener.bind(this))
        this.player.on('adError', this.adErrorListener.bind(this))
        this.player.on('adPause', this.adPauseListener.bind(this))
        this.player.on('adPlay', this.adPlayListener.bind(this))
        this.player.on('adClick', this.adClickListener.bind(this))
        this.player.on('adSkipped', this.adSkippedListener.bind(this))
    }

    /**
     * Unregister JWPlayer event listeners.
     */
    unregisterListeners () {
        this.player.off('adBreakStart', this.adBreakStartListener)
        this.player.off('adBreakEnd', this.adBreakEndListener)
        this.player.off('adStarted', this.adStartedListener)
        this.player.off('adComplete', this.adCompleteListener)
        this.player.off('adError', this.adErrorListener)
        this.player.off('adPause', this.adPauseListener)
        this.player.off('adPlay', this.adPlayListener)
        this.player.off('adClick', this.adClickListener)
        this.player.off('adSkipped', this.adSkippedListener)
    }

    // Event listeners

    adBreakStartListener() {
        OAVTLog.verbose("JWPlayer Ads event = adBreakStart")
        this.instrument.emit(OAVTAction.AdBreakBegin, this)
    }

    adBreakEndListener() {
        OAVTLog.verbose("JWPlayer Ads event = adBreakEnd")
        this.instrument.emit(OAVTAction.AdBreakFinish, this)
    }

    adStartedListener() {
        OAVTLog.verbose("JWPlayer Ads event = adStarted")
        this.instrument.emit(OAVTAction.AdBegin, this)
    }

    adCompleteListener() {
        OAVTLog.verbose("JWPlayer Ads event = adComplete")
        this.instrument.emit(OAVTAction.AdFinish, this)
    }

    adErrorListener() {
        OAVTLog.verbose("JWPlayer Ads event = adError")
        //TODO: add error attributes
        this.instrument.emit(OAVTAction.AdError, this)
    }

    adPauseListener() {
        OAVTLog.verbose("JWPlayer Ads event = adPause")
        this.instrument.emit(OAVTAction.AdPauseBegin, this)
    }

    adPlayListener() {
        OAVTLog.verbose("JWPlayer Ads event = adPlay")
        this.instrument.emit(OAVTAction.AdPauseFinish, this)
    }

    adClickListener() {
        OAVTLog.verbose("JWPlayer Ads event = adClick")
        this.instrument.emit(OAVTAction.AdClick, this)
    }

    adSkippedListener() {
        OAVTLog.verbose("JWPlayer Ads event = adSkipped")
        this.instrument.emit(OAVTAction.AdSkip, this)
    }

    // Attribute getters

    getTrackerTarget() {
        return "JWPlayerAds"
    }
}