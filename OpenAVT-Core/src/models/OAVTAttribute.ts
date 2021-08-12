/**
 * An OpenAVT Attribute.
 */
export class OAVTAttribute {
    private attributeName: string

    /**
     * OAVTAttribute constructor.
     * 
     * @param name Attribute name.
     */
    constructor(name: string) {
        this.attributeName = name
    }

    /**
     * Get attribute name.
     * 
     * @returns Attribute name.
     */
    getAttributeName(): string {
        return this.attributeName
    }

    /**
     * Get string value of object.
     * 
     * @returns String representation of object.
     */
    toString(): string {
        return this.attributeName
    }

    /** Tracker Target attribute. The target of the tracker (i.e.: AVPlayer, IMA, ...). */
    static readonly trackerTarget = new OAVTAttribute("trackerTarget")
    /** Stream Id attribute. Identificator of the stream being played. */
    static readonly streamId = new OAVTAttribute("streamId")
    /** Playback ID attribute. Identificator of the current playback. */
    static readonly playbackId = new OAVTAttribute("playbackId")
    /** Sender ID attribute. Identificator of the sender (the instrument-tracker). */
    static readonly senderId = new OAVTAttribute("senderId")
    /** Count Errors attribute. Number of errors. */
    static readonly countErrors = new OAVTAttribute("countErrors")
    /** Count Starts attribute. Number of starts. */
    static readonly countStarts = new OAVTAttribute("countStarts")
    /** Accumulated Pause Time attribute. Total amount of time in paused state. */
    static readonly accumPauseTime = new OAVTAttribute("accumPauseTime")
    /** Accumulated Buffer Time attribute. Total amount of time buffering. */
    static readonly accumBufferTime = new OAVTAttribute("accumBufferTime")
    /** Accumulated Seek Time attribute. Total amount of time seeking. */
    static readonly accumSeekTime = new OAVTAttribute("accumSeekTime")
    /** Accumulated Play Time attribute. Total amount of time playing. */
    static readonly accumPlayTime = new OAVTAttribute("accumPlayTime")
    /** Delta Play Time attribute. Time playing since last event. */
    static readonly deltaPlayTime = new OAVTAttribute("deltaPlayTime")
    /** In Pause Block attribute. Player is paused. */
    static readonly inPauseBlock = new OAVTAttribute("inPauseBlock")
    /** In Seek Block attribute. Player is seeking. */
    static readonly inSeekBlock = new OAVTAttribute("inSeekBlock")
    /** In Buffer Block attribute. Player is buffering. */
    static readonly inBufferBlock = new OAVTAttribute("inBufferBlock")
    /** In Playback Block attribute. Player is playing. */
    static readonly inPlaybackBlock = new OAVTAttribute("inPlaybackBlock")
    /** Error Description attribute. Error message. */
    static readonly errorDescription = new OAVTAttribute("errorDescription")
    /** Error Type attribute. Error type. */
    static readonly errorType = new OAVTAttribute("errorType")
    /** Error Code attribute. Error code. */
    static readonly errorCode = new OAVTAttribute("errorCode")
    /** Position attribute. Current stream position. */
    static readonly position = new OAVTAttribute("position")
    /** Duration attribute. Stream duration. */
    static readonly duration = new OAVTAttribute("duration")
    /** Resolution Height attribute. In video streams, vertical resolution. */
    static readonly resolutionHeight = new OAVTAttribute("resolutionHeight")
    /** Resolution Width attribute. In video streams, horizontal resolution. */
    static readonly resolutionWidth = new OAVTAttribute("resolutionWidth")
    /** Is Muted attribute. Playback is muted. */
    static readonly isMuted = new OAVTAttribute("isMuted")
    /** Volume attribute. Current volume. */
    static readonly volume = new OAVTAttribute("volume")
    /** FPS attribute. Frames per second. */
    static readonly fps = new OAVTAttribute("fps")
    /** Source attribute. Stream source, usually an URL. */
    static readonly source = new OAVTAttribute("source")
    /** Bitrate attribute. Stream bitrate. */
    static readonly bitrate = new OAVTAttribute("bitrate")
    /** Language attribute. Stream language. */
    static readonly language = new OAVTAttribute("language")
    /** Subtitles attribute. Subtitles language. */
    static readonly subtitles = new OAVTAttribute("subtitles")
    /** Title attribute. Stream title. */
    static readonly title = new OAVTAttribute("title")
    /** Is Ads Tracker attribute. Tracker is generating Ad events. */
    static readonly isAdsTracker = new OAVTAttribute("isAdsTracker")
    /** Count Ads attribute. Number of ads. */
    static readonly countAds = new OAVTAttribute("countAds")
    /** In Ad Break Block attribute. An Ad break has started. */
    static readonly inAdBreakBlock = new OAVTAttribute("inAdBreakBlock")
    /** In Ad Block attribute. Currently playing an Ad. */
    static readonly inAdBlock = new OAVTAttribute("inAdBlock")
    /** Ad Position attribute. Current Ad stream position. */
    static readonly adPosition = new OAVTAttribute("adPosition")
    /** Ad Duration attribute. Ad stream duration. */
    static readonly adDuration = new OAVTAttribute("adDuration")
    /** Ad Buffered Time attribute. Amount of Ad stream buffered. */
    static readonly adBufferedTime = new OAVTAttribute("adBufferedTime")
    /** Ad Volume attribute. Current Ad volume. */
    static readonly adVolume = new OAVTAttribute("adVolume")
    /** Ad Roll attribute. Ad position within the main stream (pre, mid, post). */
    static readonly adRoll = new OAVTAttribute("adRoll")
    /** Ad Description attribute. Ad description. */
    static readonly adDescription = new OAVTAttribute("adDescription")
    /** Ad ID attribute. Ad ID. */
    static readonly adId = new OAVTAttribute("adId")
    /** Ad Title attribute. Ad Title. */
    static readonly adTitle = new OAVTAttribute("adTitle")
    /** Ad Advertiser Name attribute. Ad advertiser name. */
    static readonly adAdvertiserName = new OAVTAttribute("adAdvertiserName")
    /** Ad Creative ID attribute. Ad creative ID. */
    static readonly adCreativeId = new OAVTAttribute("adCreativeId")
    /** Ad Bitrate attribute. Ad stream bitrate. */
    static readonly adBitrate = new OAVTAttribute("adBitrate")
    /** Ad Resolution Height attribute. Ad vertical resolution. */
    static readonly adResolutionHeight = new OAVTAttribute("adResolutionHeight")
    /** Ad Resolution Width attribute. Ad horizontal resolution. */
    static readonly adResolutionWidth = new OAVTAttribute("adResolutionWidth")
    /** Ad System attribute. Ad system. */
    static readonly adSystem = new OAVTAttribute("adSystem")
    /** Ad Client attribute. Ad provider (ima, freewheel, vast, etc) */
    static readonly adClient = new OAVTAttribute("adClient")
}