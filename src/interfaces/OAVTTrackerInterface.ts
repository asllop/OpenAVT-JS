import { OAVTEvent } from "../models/OAVTEvent";
import { OAVTState } from "../models/OAVTState";

/**
 * OpenAVT base interface for instrument tracker components.
 */
 export interface OAVTTrackerInterface {
    /**
     * Init an event.
     *
     * @param event Event received.
     * @return Event or null.
     */
    initEvent(event: OAVTEvent): OAVTEvent;
    /**
     * Tracked ID.
     */
    trackerId : number
    /**
     * Tracker state.
     */
    state : OAVTState
}