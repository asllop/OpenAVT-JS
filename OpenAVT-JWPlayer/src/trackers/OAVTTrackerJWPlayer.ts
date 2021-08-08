import { OAVTEvent, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

/**
 * OpenAVT JWPlayer tracker.
 */
export class OAVTTrackerJWPlayer implements OAVTTrackerInterface {

    private player: any = null
    private instrument: OAVTInstrument = null

    /**
     * Build a OpenAVT JWPlayer tracker.
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
        this.player.on('viewable', this.viewableListener.bind(this))
        this.player.on('beforePlay', this.beforePlayListener.bind(this))
        this.player.on('firstFrame', this.firstFrameListener.bind(this))
        this.player.on('play', this.playListener.bind(this))
        this.player.on('pause', this.pauseListener.bind(this))
        this.player.on('buffer', this.bufferListener.bind(this))
        this.player.on('seek', this.seekListener.bind(this))
        this.player.on('seeked', this.seekedListener.bind(this))
        this.player.on('complete', this.completeListener.bind(this))
        this.player.on('visualQuality', this.visualQualityListener.bind(this))
        this.player.on('error', this.errorListener.bind(this))
        this.player.on('setupError', this.setupErrorListener.bind(this))
      }
    
      unregisterListeners () {
          //TODO: unregister listeners
      }
      
      readyListener() {
        OAVTLog.verbose("JWPlayer event = ready")
      }

      playlistListener() {
        OAVTLog.verbose("JWPlayer event = playlist")
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