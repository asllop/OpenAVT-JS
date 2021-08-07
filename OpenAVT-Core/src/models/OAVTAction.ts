import { OAVTAttribute } from "./OAVTAttribute"

/**
 * An OpenAVT Action.
 */
export class OAVTAction {
    private actionName: string
    private timeAttribute: OAVTAttribute

    /**
     * OAVTAction constructor.
     * 
     * @param name Action name.
     * @param attribute Time since attribute.
     */
    constructor(name: string, attribute = new OAVTAttribute("timeSince" + name)) {
        this.actionName = name
        this.timeAttribute = attribute
    }

    /**
     * Get action name.
     * 
     * @returns Action name.
     */
    getActionName(): string {
        return this.actionName
    }

    /**
     * Get time-since attibute.
     * @returns Time-since attribute.
     */
    getTimeAttribute(): OAVTAttribute {
        return this.timeAttribute
    }

    /** Tracker Init action. Sent when a tracker is started. */
    static readonly TrackerInit = new OAVTAction("TrackerInit")
    /** Media Request action. Sent when an audio/video stream is requested. */
    static readonly MediaRequest = new OAVTAction("MediaRequest")
    /** Player Set action. Sent when a player instance is sent to the tracker. */
    static readonly PlayerSet = new OAVTAction("PlayerSet")
    /** Player Ready action. Sent when the player is ready to receive commands. */
    static readonly PlayerReady = new OAVTAction("PlayerReady")
    /** Prepare Item action. Sent when an audio/video item is prepared. */
    static readonly PrepareItem = new OAVTAction("PrepareItem")
    /** Manifest Load action. Sent when the stream manifest is loaded. */
    static readonly ManifestLoad = new OAVTAction("ManifestLoad")
    /** Stream Load action. Sent when an audio/video stream is loaded. */
    static readonly StreamLoad = new OAVTAction("StreamLoad")
    /** Start action. Sent when an stram starts playing. */
    static readonly Start = new OAVTAction("Start")
    /** Buffer Begin action. Sent when the player starts buffering. */
    static readonly BufferBegin = new OAVTAction("BufferBegin")
    /** Buffer Finish action. Sent when the player ends buffering. */
    static readonly BufferFinish = new OAVTAction("BufferFinish")
    /** Seek Begin action. Sent when the player starts seeking. */
    static readonly SeekBegin = new OAVTAction("SeekBegin")
    /** Seek Finish action. Sent when the player ends seeking. */
    static readonly SeekFinish = new OAVTAction("SeekFinish")
    /** Pause Begin action. Sent when the playback is paused. */
    static readonly PauseBegin = new OAVTAction("PauseBegin")
    /** Pause Finish action. Sent when the playback is resumed. */
    static readonly PauseFinish = new OAVTAction("PauseFinish")
    /** Forward Begin action. Sent when the player starts fast forward. */
    static readonly ForwardBegin = new OAVTAction("ForwardBegin")
    /** Forward Finish action. Sent when the player ends fast forward. */
    static readonly ForwardFinish = new OAVTAction("ForwardFinish")
    /** Rewind Begin action. Sent when the player starts rewind. */
    static readonly RewindBegin = new OAVTAction("RewindBegin")
    /** Rewind Finish action. Sent when the player ends rewind. */
    static readonly RewindFinish = new OAVTAction("RewindFinish")
    /** Quality Change Up action. Sent when the stream quality goes up. */
    static readonly QualityChangeUp = new OAVTAction("QualityChangeUp")
    /** Quality Change Down action. Sent when the stream quality goes down. */
    static readonly QualityChangeDown = new OAVTAction("QualityChangeDown")
    /** Stop action. Sent when the stream is stoped by the user. */
    static readonly Stop = new OAVTAction("Stop")
    /** End action. Sent when the stream ends. */
    static readonly End = new OAVTAction("End")
    /** Next action. Sent when a playlist moves to the next stream in the list. */
    static readonly Next = new OAVTAction("Next")
    /** Error action. Sent when an error happens. */
    static readonly Error = new OAVTAction("Error")
    /** Ping action. Sent periodically when the ping timer is enabled. */
    static readonly Ping = new OAVTAction("Ping")
    /** Ad Break Begin action. Sent when an ad block starts. */
    static readonly AdBreakBegin = new OAVTAction("AdBreakBegin")
    /** Ad Break Finish action. Sent when an ad block ends. */
    static readonly AdBreakFinish = new OAVTAction("AdBreakFinish")
    /** Ad Begin action. Sent when an ad starts playing. */
    static readonly AdBegin = new OAVTAction("AdBegin")
    /** Ad Finish action. Sent when an ad ends playing. */
    static readonly AdFinish = new OAVTAction("AdFinish")
    /** Ad Pause Begin action. Sent when the an ad is paused. */
    static readonly AdPauseBegin = new OAVTAction("AdPauseBegin")
    /** Ad Pause Finish action. Sent when the an ad is resumed. */
    static readonly AdPauseFinish = new OAVTAction("AdPauseFinish")
    /** Ad Buffer Begin action. Sent when the ad starts buffering. */
    static readonly AdBufferBegin = new OAVTAction("AdBufferBegin")
    /** Ad Buffer Finish action. Sent when the ad ends buffering. */
    static readonly AdBufferFinish = new OAVTAction("AdBufferFinish")
    /** Ad Skip action. Sent when the an ad is skipped. */
    static readonly AdSkip = new OAVTAction("AdSkip")
    /** Ad Click action. Sent when the an ad is clicked. */
    static readonly AdClick = new OAVTAction("AdClick")
    /** Ad First Quartile action. Sent when the an ad reaches the first quartiles. */
    static readonly AdFirstQuartile = new OAVTAction("AdFirstQuartile")
    /** Ad Second Quartile action. Sent when the an ad reaches the second quartiles. */
    static readonly AdSecondQuartile = new OAVTAction("AdSecondQuartile")
    /** Ad Third Quartile action. Sent when the an ad reaches the third quartiles. */
    static readonly AdThirdQuartile = new OAVTAction("AdThirdQuartile")
    /** Ad Error action. Sent when an error happens during an ad. */
    static readonly AdError = new OAVTAction("AdError")
}