import { OAVTTrackerInterface } from "./interfaces/OAVTTrackerInterface";

export class OAVTInstrument {
    private trackers : {[key: number]: OAVTTrackerInterface} = {}
    private nextTrackerId : number = 0

    constructor() {
        console.log("Created a new OAVTInstrument instance")
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