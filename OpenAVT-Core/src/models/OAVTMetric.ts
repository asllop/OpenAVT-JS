import { OAVTSample } from "./OAVTSample"

/** Metric type */
export enum MetricType {
    /** Counter */
    Counter = 0,
    /** Gauge */
    Gauge = 1
}

/**
 * OpenAVT metric.
 */
export class OAVTMetric extends OAVTSample {
    private name: string
    private value: number
    private type: MetricType

    /**
     * OAVTMetric constructor.
     * 
     * @param name Metric name.
     * @param type Metric type.
     * @param value Metric value.
     */
    constructor(name: string, type: MetricType, value: number) {
        super()
        this.name = name
        this.value = value
        this.type = type
    }

    /**
     * Start time metric name.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static StartTime(value: number) { return new OAVTMetric("StartTime", MetricType.Gauge, value) }

    /**
     * Number of streams played metric name.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static  NumPlays(value: number) { return new OAVTMetric("NumPlays", MetricType.Counter, value) }

    /**
     * Rebuffer time metric name.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static RebufferTime(value: number) { return new OAVTMetric("RebufferTime", MetricType.Gauge, value) }

    /**
     * Number of rebufers metric name.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static NumRebuffers(value: number) { return new OAVTMetric("NumRebuffers", MetricType.Counter, value) }

    /**
     * Playtime since last event.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static PlayTime(value: number) { return new OAVTMetric("PlayTime", MetricType.Gauge, value) }

    /**
     * Number of streams requested metric name.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static NumRequests(value: number) { return new OAVTMetric("NumRequests", MetricType.Counter, value) }

    /**
     * Number of streams loaded metric name.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static NumLoads(value: number) { return new OAVTMetric("NumLoads", MetricType.Counter, value) }
    
    /**
     * Number of streams ended metric name.
     * 
     * @param value Metric value
     * @returns Metric instance.
     */
    static NumEnds(value: number) { return new OAVTMetric("NumEnds", MetricType.Counter, value) }
}