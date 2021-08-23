import { OAVTAction, OAVTEvent, OAVTAttribute, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

/**
 * OpenAVT JWPlayer tracker.
 */
export class OAVTTrackerJWPlayer implements OAVTTrackerInterface {

    private player: any = null
    private instrument: OAVTInstrument = null
    private lastResolutionHeight = 0
    private lastResolutionWidth = 0
    private lastErr: any = null

    /**
     * Build an OpenAVT JWPlayer tracker.
     * 
     * @param player JWPlayer instance.
     */
    constructor(player: Object = null) {
        if (player != null) {
            this.setPlayer(player)
        }
    }

    initEvent(event: OAVTEvent): OAVTEvent {
        if (event.getAction().getActionName() == OAVTAction.Error.getActionName()) {
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
        this.instrument.registerGetter(OAVTAttribute.title, this.getTitle.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.position, this.getPosition.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.duration, this.getDuration.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.resolutionHeight, this.getResolutionHeight.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.resolutionWidth, this.getResolutionWidth.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.isMuted, this.getIsMuted.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.volume, this.getVolume.bind(this), this)
        //this.instrument.registerGetter(OAVTAttribute.fps, this.getFps.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.source, this.getSource.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.bitrate, this.getBitrate.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.language, this.getLanguage.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.subtitles, this.getSubtitles.bind(this), this)
        this.instrument.registerGetter(OAVTAttribute.isAdsTracker, this.getIsAdsTracker.bind(this), this)
    }

    /**
     * Register JWPlayer event listeners.
     */
    registerListeners () {
        this.player.on('ready', this.readyListener.bind(this))
        this.player.on('playlist', this.playlistListener.bind(this))
        this.player.on('playlistItem', this.playlistItemListener.bind(this))
        this.player.on('viewable', this.viewableListener.bind(this))
        this.player.on('beforePlay', this.beforePlayListener.bind(this))
        this.player.on('firstFrame', this.firstFrameListener.bind(this))
        this.player.on('idle', this.idleListener.bind(this))
        this.player.on('playbackRateChanged', this.playbackRateChangedListener.bind(this))
        this.player.on('nextClick', this.nextClickListener.bind(this))
        this.player.on('play', this.playListener.bind(this))
        this.player.on('pause', this.pauseListener.bind(this))
        this.player.on('buffer', this.bufferListener.bind(this))
        this.player.on('seek', this.seekListener.bind(this))
        this.player.on('seeked', this.seekedListener.bind(this))
        this.player.on('complete', this.completeListener.bind(this))
        this.player.on('beforeComplete', this.beforeCompleteListener.bind(this))
        this.player.on('playlistComplete', this.playlistCompleteListener.bind(this))
        this.player.on('visualQuality', this.visualQualityListener.bind(this))
        this.player.on('error', this.errorListener.bind(this))
        this.player.on('setupError', this.setupErrorListener.bind(this))
    }

    /**
     * Unregister JWPlayer event listeners.
     */
    unregisterListeners () {
        this.player.off('ready', this.readyListener)
        this.player.off('playlist', this.playlistListener)
        this.player.off('playlistItem', this.playlistItemListener)
        this.player.off('viewable', this.viewableListener)
        this.player.off('beforePlay', this.beforePlayListener)
        this.player.off('firstFrame', this.firstFrameListener)
        this.player.off('idle', this.idleListener)
        this.player.off('playbackRateChanged', this.playbackRateChangedListener)
        this.player.off('nextClick', this.nextClickListener)
        this.player.off('play', this.playListener)
        this.player.off('pause', this.pauseListener)
        this.player.off('buffer', this.bufferListener)
        this.player.off('seek', this.seekListener)
        this.player.off('seeked', this.seekedListener)
        this.player.off('complete', this.completeListener)
        this.player.off('beforeComplete', this.beforeCompleteListener)
        this.player.off('playlistComplete', this.playlistCompleteListener)
        this.player.off('visualQuality', this.visualQualityListener)
        this.player.off('error', this.errorListener)
        this.player.off('setupError', this.setupErrorListener)
    }

    // Event listeners
    
    readyListener() {
        OAVTLog.verbose("JWPlayer event = ready")
    }

    playlistListener() {
        OAVTLog.verbose("JWPlayer event = playlist")
    }

    playlistItemListener() {
        OAVTLog.verbose("JWPlayer event = playlistItem")
    }

    viewableListener() {
        OAVTLog.verbose("JWPlayer event = viewable")
    }

    beforePlayListener() {
        OAVTLog.verbose("JWPlayer event = beforePlay")
        this.instrument.emit(OAVTAction.StreamLoad, this)
    }

    firstFrameListener() {
        OAVTLog.verbose("JWPlayer event = firstFrame")
        this.instrument.emit(OAVTAction.Start, this)
        this.lastResolutionHeight = this.getResolutionHeight()
        this.lastResolutionWidth = this.getResolutionWidth()
    }

    idleListener() {
        OAVTLog.verbose("JWPlayer event = idle")
        this.instrument.emit(OAVTAction.BufferFinish, this)
        this.instrument.emit(OAVTAction.PauseFinish, this)
        this.instrument.emit(OAVTAction.End, this)
    }

    playbackRateChangedListener() {
        OAVTLog.verbose("JWPlayer event = playbackRateChanged")
    }

    nextClickListener() {
        OAVTLog.verbose("JWPlayer event = nextClick")
    }

    playListener() {
        OAVTLog.verbose("JWPlayer event = play")
        this.instrument.emit(OAVTAction.BufferFinish, this)
        this.instrument.emit(OAVTAction.PauseFinish, this)
    }

    pauseListener() {
        OAVTLog.verbose("JWPlayer event = pause")
        this.instrument.emit(OAVTAction.PauseBegin, this)
    }

    bufferListener() {
        OAVTLog.verbose("JWPlayer event = buffer")
        this.instrument.emit(OAVTAction.BufferBegin, this)
    }

    seekListener() {
        OAVTLog.verbose("JWPlayer event = seek")
        this.instrument.emit(OAVTAction.SeekBegin, this)
    }

    seekedListener() {
        OAVTLog.verbose("JWPlayer event = seeked")
        this.instrument.emit(OAVTAction.SeekFinish, this)
    }

    completeListener() {
        OAVTLog.verbose("JWPlayer event = complete")
        this.instrument.emit(OAVTAction.BufferFinish, this)
        this.instrument.emit(OAVTAction.PauseFinish, this)
        this.instrument.emit(OAVTAction.End, this)
    }

    beforeCompleteListener() {
        OAVTLog.verbose("JWPlayer event = beforeComplete")
    }

    playlistCompleteListener() {
        OAVTLog.verbose("JWPlayer event = playlistComplete")
    }

    visualQualityListener() {
        OAVTLog.verbose("JWPlayer event = visualQuality")
        this.checkResolutionChange()
    }

    errorListener(err: any) {
        OAVTLog.verbose("JWPlayer event = error")
        this.lastErr = err
        this.instrument.emit(OAVTAction.Error, this)
    }

    setupErrorListener(err: any) {
        OAVTLog.verbose("JWPlayer event = setupError")
        this.lastErr = err
        this.instrument.emit(OAVTAction.Error, this)
    }

    // Attribute getters

    getTrackerTarget() {
        return "JWPlayer"
    }

    getTitle() {
        return this.player?.getPlaylistItem()?.title
    }

    getPosition() {
        return Math.floor(this.player?.getPosition() * 1000)
    }

    getDuration() {
        return Math.floor(this.player?.getDuration() * 1000)
    }

    getResolutionHeight() {
        return this.player?.getVisualQuality()?.level?.height
    }

    getResolutionWidth() {
        return this.player?.getVisualQuality()?.level?.width
    }

    getIsMuted() {
        return this.player?.getMute()
    }

    getVolume() {
        return Math.floor(this.player?.getVolume())
    }

    getSource() {
        return this.player?.getPlaylistItem()?.file
    }

    getBitrate() {
        return this.player?.getVisualQuality()?.level?.bitrate
    }

    getLanguage() {
        let i = this.player?.getCurrentAudioTrack()
        if (i >= 0) {
          return this.player?.getAudioTracks()[i]?.language
        }
    }

    getSubtitles() {
        let index = this.player.getCurrentCaptions()
        let captions = this.player.getCaptionsList()
        if (index < captions?.length) {
            let caption = captions[index]
            if (caption.id != null && caption.label != null && caption.id != "off") {
                return caption.label
            }
        }
        return null
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