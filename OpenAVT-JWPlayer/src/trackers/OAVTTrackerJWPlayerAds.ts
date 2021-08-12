import { OAVTAction, OAVTAttribute, OAVTEvent, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

/**
 * OpenAVT JWPlayer Ads tracker.
 */
export class OAVTTrackerJWPlayerAds implements OAVTTrackerInterface {

    private player: any = null
    private instrument: OAVTInstrument = null
    private lastErr: any = null
    private adRoll: string = null
    private adId: string = null
    private adSystem: string = null
    private adTitle: string = null
    private adDuration: number = null
    private adCreativeId: string = null

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
        if (event.getAction().getActionName() == OAVTAction.AdError.getActionName()) {
            event.setAttribute(OAVTAttribute.errorDescription, this.lastErr.message)
            event.setAttribute(OAVTAttribute.errorCode, this.lastErr.code)
            event.setAttribute(OAVTAttribute.errorType, this.lastErr.type)
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
        this.instrument.registerGetter(OAVTAttribute.adId, this.getAdId.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.adRoll, this.getAdRoll.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.adSystem, this.getAdSystem.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.adTitle, this.getAdTitle.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.adDuration, this.getAdDuration.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.adCreativeId, this.getAdCreativeId.bind(this), this)
    }

    /**
     * Register JWPlayer event listeners.
     */
    registerListeners () {
        this.player.on('adLoaded', this.adLoadedListener.bind(this))
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
        this.player.off('adLoaded', this.adLoadedListener)
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

    adLoadedListener(ev: any) {
        OAVTLog.verbose("JWPlayer Ads event = adLoaded", ev)
        this.adId = ev.adId || ev.id
        this.adSystem = ev.adsystem
        this.adTitle = ev.adtitle
        this.adDuration = ev.duration
        this.adCreativeId = ev.ima?.ad?.g?.creativeId
    }

    adBreakStartListener(ev: any) {
        OAVTLog.verbose("JWPlayer Ads event = adBreakStart", ev)
        this.adRoll = ev.adposition
        this.adId = ev.adId || ev.id
        this.instrument.emit(OAVTAction.AdBreakBegin, this)
    }

    adBreakEndListener() {
        OAVTLog.verbose("JWPlayer Ads event = adBreakEnd")
        // Force AdFinish when an ad beak ends.
        this.instrument.emit(OAVTAction.AdFinish, this)
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

    adErrorListener(err: any) {
        OAVTLog.verbose("JWPlayer Ads event = adError")
        this.lastErr = err
        this.instrument.emit(OAVTAction.AdError, this)
    }

    adPauseListener() {
        OAVTLog.verbose("JWPlayer Ads event = adPause")
        this.instrument.emit(OAVTAction.AdPauseBegin, this)
    }

    adPlayListener() {
        OAVTLog.verbose("JWPlayer Ads event = adPlay")
        // We put an AdBegin here because FreeWheel does not send an AdStart (IMA does).
        this.instrument.emit(OAVTAction.AdBegin, this)
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

    getAdId() {
        return this.adId
    }
    
    getAdRoll() {
        return this.adRoll
    }
    
    getAdSystem() {
        this.adSystem
    }

    getAdTitle() {
        return this.adTitle
    }
    
    getAdDuration() {
        return this.adDuration ? this.adDuration * 1000 : null
    }

    getAdCreativeId() {
        return this.adCreativeId
    }
}