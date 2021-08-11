import { OAVTEvent } from "../models/OAVTEvent"
import { OAVTMetric } from "../models/OAVTMetric"
import { OAVTComponentInterface } from "./OAVTComponentInterface"
import { OAVTTrackerInterface } from "./OAVTTrackerInterface"

/**
 * OpenAVT interface for instrument metricalc components.
 */
export interface OAVTMetricalcInterface extends OAVTComponentInterface {
    /**
     * Process metrics.
     * 
     * @param event Event received.
     * @param tracker Tracker that generated the event.
     */
    processMetric(event: OAVTEvent, tracker: OAVTTrackerInterface): OAVTMetric[]
}