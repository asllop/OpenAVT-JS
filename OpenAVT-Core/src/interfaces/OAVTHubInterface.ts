import { OAVTEvent } from "../models/OAVTEvent"
import { OAVTComponentInterface } from "./OAVTComponentInterface"
import { OAVTTrackerInterface } from "./OAVTTrackerInterface"

/**
 * OpenAVT interface for instrument hub components.
 */
export interface OAVTHubInterface extends OAVTComponentInterface {
    /**
     * Process an event.
     * 
     * @param event Event received.
     * @param tracker Tracker that generated the event.
     */
    processEvent(event: OAVTEvent, tracker: OAVTTrackerInterface): OAVTEvent
}