export class OAVTAction {
    private actionName: String
    //TODO: timeAttribute

    constructor(name: String) {
        this.actionName = name
    }
}

export class OAVTActions {
    /** Tracker Init action. Sent when a tracker is started. */
    static TrackerInit = new OAVTAction("TrackerInit")
    /** Media Request action. Sent when an audio/video stream is requested. */
    static MediaRequest = new OAVTAction("MediaRequest")
    /** Player Set action. Sent when a player instance is sent to the tracker. */
    static PlayerSet = new OAVTAction("PlayerSet")
    /** Player Ready action. Sent when the player is ready to receive commands. */
    static PlayerReady = new OAVTAction("PlayerReady")
    /** Prepare Item action. Sent when an audio/video item is prepared. */
    static PrepareItem = new OAVTAction("PrepareItem")
    /** Manifest Load action. Sent when the stream manifest is loaded. */
    static ManifestLoad = new OAVTAction("ManifestLoad")
    /** Stream Load action. Sent when an audio/video stream is loaded. */
    static StreamLoad = new OAVTAction("StreamLoad")
    /** Start action. Sent when an stram starts playing. */
    static Start = new OAVTAction("Start")
    /** Buffer Begin action. Sent when the player starts buffering. */
    static BufferBegin = new OAVTAction("BufferBegin")
    /** Buffer Finish action. Sent when the player ends buffering. */
    static BufferFinish = new OAVTAction("BufferFinish")
    /** Seek Begin action. Sent when the player starts seeking. */
    static SeekBegin = new OAVTAction("SeekBegin")
    /** Seek Finish action. Sent when the player ends seeking. */
    static SeekFinish = new OAVTAction("SeekFinish")
    /** Pause Begin action. Sent when the playback is paused. */
    static PauseBegin = new OAVTAction("PauseBegin")
    /** Pause Finish action. Sent when the playback is resumed. */
    static PauseFinish = new OAVTAction("PauseFinish")
    /** Forward Begin action. Sent when the player starts fast forward. */
    static ForwardBegin = new OAVTAction("ForwardBegin")
    /** Forward Finish action. Sent when the player ends fast forward. */
    static ForwardFinish = new OAVTAction("ForwardFinish")
    /** Rewind Begin action. Sent when the player starts rewind. */
    static RewindBegin = new OAVTAction("RewindBegin")
    /** Rewind Finish action. Sent when the player ends rewind. */
    static RewindFinish = new OAVTAction("RewindFinish")
    /** Quality Change Up action. Sent when the stream quality goes up. */
    static QualityChangeUp = new OAVTAction("QualityChangeUp")
    /** Quality Change Down action. Sent when the stream quality goes down. */
    static QualityChangeDown = new OAVTAction("QualityChangeDown")
    /** Stop action. Sent when the stream is stoped by the user. */
    static Stop = new OAVTAction("Stop")
    /** End action. Sent when the stream ends. */
    static End = new OAVTAction("End")
    /** Next action. Sent when a playlist moves to the next stream in the list. */
    static Next = new OAVTAction("Next")
    /** Error action. Sent when an error happens. */
    static Error = new OAVTAction("Error")
    /** Ping action. Sent periodically when the ping timer is enabled. */
    static Ping = new OAVTAction("Ping")
    /** Ad Break Begin action. Sent when an ad block starts. */
    static AdBreakBegin = new OAVTAction("AdBreakBegin")
    /** Ad Break Finish action. Sent when an ad block ends. */
    static AdBreakFinish = new OAVTAction("AdBreakFinish")
    /** Ad Begin action. Sent when an ad starts playing. */
    static AdBegin = new OAVTAction("AdBegin")
    /** Ad Finish action. Sent when an ad ends playing. */
    static AdFinish = new OAVTAction("AdFinish")
    /** Ad Pause Begin action. Sent when the an ad is paused. */
    static AdPauseBegin = new OAVTAction("AdPauseBegin")
    /** Ad Pause Finish action. Sent when the an ad is resumed. */
    static AdPauseFinish = new OAVTAction("AdPauseFinish")
    /** Ad Buffer Begin action. Sent when the ad starts buffering. */
    static AdBufferBegin = new OAVTAction("AdBufferBegin")
    /** Ad Buffer Finish action. Sent when the ad ends buffering. */
    static AdBufferFinish = new OAVTAction("AdBufferFinish")
    /** Ad Skip action. Sent when the an ad is skipped. */
    static AdSkip = new OAVTAction("AdSkip")
    /** Ad Click action. Sent when the an ad is clicked. */
    static AdClick = new OAVTAction("AdClick")
    /** Ad First Quartile action. Sent when the an ad reaches the first quartiles. */
    static AdFirstQuartile = new OAVTAction("AdFirstQuartile")
    /** Ad Second Quartile action. Sent when the an ad reaches the second quartiles. */
    static AdSecondQuartile = new OAVTAction("AdSecondQuartile")
    /** Ad Third Quartile action. Sent when the an ad reaches the third quartiles. */
    static AdThirdQuartile = new OAVTAction("AdThirdQuartile")
    /** Ad Error action. Sent when an error happens during an ad. */
    static AdError = new OAVTAction("AdError")
}