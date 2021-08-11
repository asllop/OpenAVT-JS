import { OAVTEvent } from "../models/OAVTEvent"
import { OAVTState } from "../models/OAVTState"
import { OAVTComponentInterface } from "./OAVTComponentInterface"

/**
 * OpenAVT interface for instrument tracker components.
 */
 export interface OAVTTrackerInterface extends OAVTComponentInterface {
    /**
     * Init an event.
     *
     * @param event Event received.
     * @return Event or null.
     */
    initEvent(event: OAVTEvent): OAVTEvent
    /**
     * Tracked ID.
     */
    trackerId : number
    /**
     * Tracker state.
     */
    state : OAVTState
}