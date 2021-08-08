import { OAVTAction, OAVTEvent, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

/**
 * OpenAVT JWPlayer tracker.
 */
export class OAVTTrackerJWPlayer implements OAVTTrackerInterface {

    private player: any = null
    private instrument: OAVTInstrument = null

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
        return event
    }
    
    trackerId: number;
    state: OAVTState = new OAVTState();

    instrumentReady(instrument: OAVTInstrument): void {
        if (this.instrument == null) {
            this.instrument = instrument
            //TODO: register getters
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
    }

    idleListener() {
        OAVTLog.verbose("JWPlayer event = idle")
        // New stream will start, end current and reset states for the next
        this.instrument.emit(OAVTAction.End, this)
        this.state.reset()
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
    }

    beforeCompleteListener() {
        OAVTLog.verbose("JWPlayer event = beforeComplete")
    }

    playlistCompleteListener() {
        OAVTLog.verbose("JWPlayer event = playlistComplete")
    }

    visualQualityListener() {
        OAVTLog.verbose("JWPlayer event = visualQuality")
        //TODO: quality changes
    }

    errorListener() {
        OAVTLog.verbose("JWPlayer event = error")
        //TODO: errors
    }

    setupErrorListener() {
        OAVTLog.verbose("JWPlayer event = setupError")
        //TODO: setup errors
    }

    //TODO: attribute getters
}