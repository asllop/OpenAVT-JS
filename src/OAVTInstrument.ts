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
     * 
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

    /**
     * Get a tracker.
     * 
     * @param trackerId Tracker ID.
     * @returns Tracker instance.
     */
    getTracker(trackerId: number): OAVTTrackerInterface {
        return this.trackers[trackerId]
    }

    /**
     * Get the hub.
     * 
     * @returns Hub instance.
     */
    getHub(): OAVTHubInterface {
        return this.hub
    }

    /**
     * Get the metricalc.
     * 
     * @returns Metricalc instance.
     */
    getMetricalc(): OAVTMetricalcInterface {
        return this.metricalc
    }

    /**
     * Get the backend.
     * 
     * @returns Backend instance.
     */
    getBackend(): OAVTBackendInterface {
        return this.backend
    }

    /**
     * Remove a tracker.
     * 
     * @param trackerId Tracker ID.
     * @returns True if removed, False otherwise.
     */
    removeTracker(trackerId: number): boolean {
        if (this.trackers[trackerId] != null) {
            let tracker = this.getTracker(trackerId)
            if (tracker != null) {
                tracker.endOfService()
                //TODO: remove tracker getters
            }
            delete this.trackers[trackerId]
            return true
        }
        else {
            return false
        }
    }

    /**
     * Tell the instrument chain everything is ready to start.
     * 
     * It calls the `instrumentReady` method of all chain components (trackers, hub, metricalc and backend).
     */
    ready() {
        if (this.backend != null) {
            this.backend.instrumentReady(this)
        }
        if (this.metricalc != null) {
            this.metricalc.instrumentReady(this)
        }
        if (this.hub != null) {
            this.hub.instrumentReady(this)
        }
        Object.keys(this.trackers).forEach(key => {
            let tracker = this.trackers[key]
            tracker.instrumentReady(this)
        })
    }

    /**
     * Tell the instrument chain the job is done and we are shutting down.
     * 
     * It calls the `endOfService` method of all chain components (trackers, hub, metricalc and backend).
     */
    shutdown() {
        Object.keys(this.trackers).forEach(key => {
            let tracker = this.trackers[key]
            tracker.endOfService()
            //TODO: remove tracker getters
        })
        if (this.hub != null) {
            this.hub.endOfService()
        }
        if (this.metricalc != null) {
            this.metricalc.endOfService()
        }
        if (this.backend != null) {
            this.backend.endOfService()
        }
    }
}