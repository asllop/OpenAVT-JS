/**
 * OpenAVT state.
 */
export class OAVTState {
    /** Media did request flag. */
    didMediaRequest = false
    /** Player set flag. */
    didPlayerSet = false
    /** Stream did load flag. */
    didStreamLoad = false
    /** Stream did start flag. */
    didStart = false
    /** Player in buffer state flag. */
    isBuffering = false
    /** Player in pause state flag. */
    isPaused = false
    /** Player in seek state flag. */
    isSeeking = false
    /** Playback finished flag. */
    didFinish = false
    /** Player in Ad break flag. */
    inAdBreak = false
    /** Player playing an Ad flag. */
    inAd = false

    /**
     * Reset the state.
     */
    reset() {
        this.didMediaRequest = false
        this.didPlayerSet = false
        this.didStreamLoad = false
        this.didStart = false
        this.isBuffering = false
        this.isPaused = false
        this.isSeeking = false
        this.didFinish = false
        this.inAdBreak = false
        this.inAd = false
    }
}