import { OAVTEvent } from "../models/OAVTEvent";
import { OAVTMetric } from "../models/OAVTMetric";
import { OAVTComponentInterface } from "./OAVTComponentInterface";

/**
 * OpenAVT interface for instrument backend components.
 */
export interface OAVTBackendInterface extends OAVTComponentInterface {
    /**
     * Send an event.
     * 
     * @param event Event received.
     */
    sendEvent(event: OAVTEvent): void
    
    /**
     * Send a metric.
     * 
     * @param metric Metric received.
     */
    sendMetric(metric: OAVTMetric): void
}