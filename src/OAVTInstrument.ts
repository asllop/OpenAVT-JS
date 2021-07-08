import { OAVTBackendInterface } from "./interfaces/OAVTBackendInterface";
import { OAVTHubInterface } from "./interfaces/OAVTHubInterface";
import { OAVTMetricalcInterface } from "./interfaces/OAVTMetricalcInterface";
import { OAVTTrackerInterface } from "./interfaces/OAVTTrackerInterface";

/**
 * An OpenAVT Instrument.
 */
export class OAVTInstrument {
    private trackers : {[key: number]: OAVTTrackerInterface} = {}
    private nextTrackerId : number = 0
    private hub : OAVTHubInterface = null
    private metricalc : OAVTMetricalcInterface = null
    private backend : OAVTBackendInterface = null

    /**
     * OAVTInstrument constructor.
     * @param hub An object conforming to OAVTHubInterface.
     * @param backend An object conforming to OAVTBackendInterface.
     * @param metricalc (optional) An object conforming to OAVTMetricalcInterface.
     */
    constructor(hub: OAVTHubInterface, backend: OAVTBackendInterface, metricalc: OAVTMetricalcInterface = null) {
        console.log("Created a new OAVTInstrument instance")
        this.setHub(hub)
        this.setMetricalc(metricalc)
        this.setBackend(backend)
    }
    
    /**
     * Set the hub instance.
     * 
     * @param hub An object conforming to OAVTHubInterface.
     */
    setHub(hub: OAVTHubInterface) {
        if (this.hub != null) {
            hub.endOfService()
        }
        this.hub = hub
    }

    /**
     * Set the metricalc instance.
     * 
     * @param metricalc  An object conforming to OAVTMetricalcInterface.
     */
    setMetricalc(metricalc: OAVTMetricalcInterface) {
        if (this.metricalc != null) {
            metricalc.endOfService()
        }
        this.metricalc = metricalc
    }

    /**
     * Set the backend instance.
     * 
     * @param backend An object conforming to OAVTBackendInterface.
     */
    setBackend(backend: OAVTBackendInterface) {
        if (this.backend != null) {
            backend.endOfService()
        }
        this.backend = backend
    }

    /**
     * Add a tracker instance.
     * 
     * @param tracker An object conforming to OAVTTrackerInterface.
     * @returns The Tracker ID.
     */
    addTracker(tracker: OAVTTrackerInterface): number {
        let trackerId = this.nextTrackerId
        this.nextTrackerId++
        tracker.trackerId = trackerId
        this.trackers[trackerId] = tracker
        return trackerId
    }

    /**
     * Get the list of trackers.
     *
     * @return Dictionary of trackers, using tracker ID as a key.
     */
    getTrackers(): {[key: number]: OAVTTrackerInterface} {
        return this.trackers
    }
}