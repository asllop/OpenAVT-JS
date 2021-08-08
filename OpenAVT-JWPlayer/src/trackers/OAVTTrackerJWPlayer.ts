import { OAVTEvent, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

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
    constructor(player: Object) {
        OAVTLog.verbose("Construct JWPlayer Tracker = ", player)
        this.player = player
    }

    initEvent(event: OAVTEvent): OAVTEvent {
        OAVTLog.verbose("JWPlayer Tracker received event = ", event)
        return event
    }
    
    trackerId: number;
    state: OAVTState = new OAVTState();

    instrumentReady(instrument: OAVTInstrument): void {
        OAVTLog.verbose("JWPlayer Tracker instrumentReady")
        if (this.instrument == null) {
            this.instrument = instrument
            this.registerListeners()
        }
    }

    endOfService(): void {
        OAVTLog.verbose("JWPlayer Tracker endOfService")
        this.unregisterListeners()
    }

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
      }

      firstFrameListener() {
        OAVTLog.verbose("JWPlayer event = firstFrame")
      }

      idleListener() {
        OAVTLog.verbose("JWPlayer event = idle")
      }

      playbackRateChangedListener() {
        OAVTLog.verbose("JWPlayer event = playbackRateChanged")
      }

      nextClickListener() {
        OAVTLog.verbose("JWPlayer event = nextClick")
      }

      playListener() {
        OAVTLog.verbose("JWPlayer event = play")
      }

      pauseListener() {
        OAVTLog.verbose("JWPlayer event = pause")
      }

      bufferListener() {
        OAVTLog.verbose("JWPlayer event = buffer")
      }

      seekListener() {
        OAVTLog.verbose("JWPlayer event = seek")
      }

      seekedListener() {
        OAVTLog.verbose("JWPlayer event = seeked")
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
      }

      errorListener() {
        OAVTLog.verbose("JWPlayer event = error")
      }

      setupErrorListener() {
        OAVTLog.verbose("JWPlayer event = setupError")
      }
}