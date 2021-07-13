import { OAVTBackendInterface } from "./interfaces/OAVTBackendInterface";
import { OAVTHubInterface } from "./interfaces/OAVTHubInterface";
import { OAVTMetricalcInterface } from "./interfaces/OAVTMetricalcInterface";
import { OAVTTrackerInterface } from "./interfaces/OAVTTrackerInterface";
import { OAVTAction } from "./models/OAVTAction";
import { OAVTAttribute } from "./models/OAVTAttribute";
import { OAVTEvent } from "./models/OAVTEvent";
import { OAVTMap } from "./utils/OAVTMap";

/**
 * An OpenAVT Instrument.
 */
export class OAVTInstrument {
    private instrumentId : string
    private trackers : OAVTMap<number, OAVTTrackerInterface> = new OAVTMap()
    private nextTrackerId : number = 0
    private hub : OAVTHubInterface = null
    private metricalc : OAVTMetricalcInterface = null
    private backend : OAVTBackendInterface = null
    private timeSince : OAVTMap<OAVTAttribute, number> = new OAVTMap()
    private trackerGetters: OAVTMap<number, OAVTMap<OAVTAttribute, any>> = new OAVTMap()

    /**
     * OAVTInstrument constructor.
     * 
     * @param hub An object conforming to OAVTHubInterface.
     * @param backend An object conforming to OAVTBackendInterface.
     * @param metricalc (optional) An object conforming to OAVTMetricalcInterface.
     */
    constructor(hub: OAVTHubInterface, backend: OAVTBackendInterface, metricalc: OAVTMetricalcInterface = null) {
        this.instrumentId = Math.floor(Math.random() * 1000000000).toString()
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
            this.hub.endOfService()
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
            this.metricalc.endOfService()
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
            this.backend.endOfService()
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
        this.trackers.set(trackerId, tracker)
        return trackerId
    }

    /**
     * Get the list of trackers.
     *
     * @return Dictionary of trackers, using tracker ID as a key.
     */
    getTrackers(): {[key: string]: OAVTTrackerInterface} {
        return this.trackers.dic()
    }

    /**
     * Get a tracker.
     * 
     * @param trackerId Tracker ID.
     * @returns Tracker instance.
     */
    getTracker(trackerId: number): OAVTTrackerInterface {
        return this.trackers.get(trackerId)
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
        if (this.trackers.get(trackerId) != null) {
            let tracker = this.getTracker(trackerId)
            if (tracker != null) {
                tracker.endOfService()
                // Remove tracker getters
                this.trackerGetters.del(trackerId)
            }
            this.trackers.del(trackerId)
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
        this.trackers.iter((_, tracker) => {
            tracker.instrumentReady(this)
        })
    }

    /**
     * Tell the instrument chain the job is done and we are shutting down.
     * 
     * It calls the `endOfService` method of all chain components (trackers, hub, metricalc and backend).
     */
    shutdown() {
        this.trackers.iter((trackerId, tracker) => {
            tracker.endOfService()
            // Remove tracker getters
            this.trackerGetters.del(trackerId)
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

    //TODO: ping stuff

    /**
     * Emit an event.
     * 
     * It generates an `OAVTEvent` using the specified action and emits it using the specified tracker.
     * 
     * @param action Action.
     * @param tracker Tracker.
     */
    emit(action: OAVTAction, tracker: OAVTTrackerInterface) {
        if (tracker != null && this.backend != null && this.hub != null) {
            let event = this.generateEvent(action, tracker)
            let trackerEvent = tracker.initEvent(event)
            if (trackerEvent != null) {
                let hubEvent = this.hub.processEvent(trackerEvent, tracker)
                if (hubEvent != null) {
                    if (this.metricalc != null) {
                        let metrics = this.metricalc.processMetric(hubEvent, tracker)
                        for (let metric of metrics) {
                            this.backend.sendMetric(metric)
                        }
                    }
                    this.backend.sendEvent(hubEvent)

                    // Update time since
                    this.timeSince.set(event.getAction().getTimeAttribute(), new Date().getTime())
                }
            }
        }
    }

    /**
     * Register an attribute getter function.
     * 
     * @param attribute Attribute.
     * @param getter Getter function.
     * @param tracker Tracker.
     */
    registerGetter(attribute: OAVTAttribute, getter: {(): any}, tracker: OAVTTrackerInterface) {
        if (tracker.trackerId != null) {
            if (this.trackerGetters.get(tracker.trackerId) == null) {
                this.trackerGetters.set(tracker.trackerId, new OAVTMap())
            }
            this.trackerGetters.get(tracker.trackerId).set(attribute, getter)
        }
    }

    /**
     * Unregister an attribute getter function.
     * 
     * @param attribute Attribute.
     * @param tracker Tracker.
     */
    unregisterGetter(attribute: OAVTAttribute, tracker: OAVTTrackerInterface) {
        if (tracker.trackerId != null) {
            if (this.trackerGetters.get(tracker.trackerId) != null) {
                this.trackerGetters.get(tracker.trackerId).del(attribute)
            }
        }
    }

    /**
     * Call an attribute getter.
     * 
     * @param attribute Attribute.
     * @param tracker Tracker.
     * @returns Getter result.
     */
    callGetter(attribute: OAVTAttribute, tracker: OAVTTrackerInterface): any {
        if (tracker.trackerId != null) {
            if (this.trackerGetters.get(tracker.trackerId) != null) {
                if (this.trackerGetters.get(tracker.trackerId).get(attribute) != null) {
                    return this.trackerGetters.get(tracker.trackerId).get(attribute)()
                }
            }
        }
        return null
    }

    /**
     * Call an attribute getter and put the resulting attribute into an event.
     * 
     * @param attribute Attribute.
     * @param event Event.
     * @param tracker Tracker.
     */
    useGetter(attribute: OAVTAttribute, event: OAVTEvent, tracker: OAVTTrackerInterface) {
        let val = this.callGetter(attribute, tracker)
        if (val != null) {
            event.setAttribute(attribute, val)
        }
    }

    // Private methods
    
    private generateEvent(action: OAVTAction, tracker: OAVTTrackerInterface): OAVTEvent {
        let event = new OAVTEvent(action)
        
        // Generate attributes
        this.generateSenderId(tracker, event)
        this.generateTimeSince(event)
        
        return event
    }
    
    private generateSenderId(tracker: OAVTTrackerInterface, event: OAVTEvent) {
        event.setAttribute(OAVTAttribute.senderId, this.instrumentId + "-" + tracker.trackerId)
    }
    
    private generateTimeSince(event: OAVTEvent) {
        this.timeSince.iter((attribute, timestamp) => {
            let timeSince = new Date().getTime() - timestamp
            event.setAttribute(attribute, timeSince)
        })
    }
}