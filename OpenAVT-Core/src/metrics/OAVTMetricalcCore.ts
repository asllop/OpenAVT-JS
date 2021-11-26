import { OAVTEvent, OAVTMetric, OAVTTrackerInterface, OAVTInstrument, OAVTAttribute, OAVTAction } from ".."
import { OAVTMetricalcInterface } from "../interfaces/OAVTMetricalcInterface"

/**
 * Metricalc core.
 */
export class OAVTMetricalcCore implements OAVTMetricalcInterface {
    processMetric(event: OAVTEvent, tracker: OAVTTrackerInterface): OAVTMetric[] {
        let metricArray : OAVTMetric[] = []

        if (event.getAction().getActionName() == OAVTAction.Start.getActionName()) {
            let timeSinceMediaRequest = event.getAttribute(OAVTAction.MediaRequest.getTimeAttribute()) as number
            let timeSinceStreamLoad = event.getAttribute(OAVTAction.StreamLoad.getTimeAttribute()) as number

            if (timeSinceMediaRequest != null) {
                metricArray.push(OAVTMetric.StartTime(timeSinceMediaRequest))
            }
            else if (timeSinceStreamLoad != null) {
                metricArray.push(OAVTMetric.StartTime(timeSinceStreamLoad))
            }
            metricArray.push(OAVTMetric.NumPlays(1))
        }
        else if (event.getAction().getActionName() == OAVTAction.BufferFinish.getActionName()) {
            let inPlaybackBlock = event.getAttribute(OAVTAttribute.inPlaybackBlock) as boolean
            let inPauseBlock = event.getAttribute(OAVTAttribute.inPauseBlock) as boolean
            let inSeekBlock = event.getAttribute(OAVTAttribute.inSeekBlock) as boolean
            if (inPlaybackBlock != null && inPauseBlock != null && inSeekBlock != null) {
                if (inPlaybackBlock && !inPauseBlock && !inSeekBlock) {
                    let timeSinceBufferBegin = event.getAttribute(OAVTAction.BufferBegin.getTimeAttribute()) as number
                    if (timeSinceBufferBegin != null) {
                        metricArray.push(OAVTMetric.RebufferTime(timeSinceBufferBegin))
                        metricArray.push(OAVTMetric.NumRebuffers(1))
                    }
                }
            }
        }
        else if (event.getAction().getActionName() == OAVTAction.MediaRequest.getActionName()) {
            metricArray.push(OAVTMetric.NumRequests(1))
        }
        else if (event.getAction().getActionName() == OAVTAction.StreamLoad.getActionName()) {
            metricArray.push(OAVTMetric.NumLoads(1))
        }
        else if (event.getAction().getActionName() == OAVTAction.End.getActionName() || event.getAction().getActionName() == OAVTAction.Stop.getActionName() || event.getAction().getActionName() == OAVTAction.Next.getActionName()) {
            metricArray.push(OAVTMetric.NumEnds(1))
        }
        
        let deltaPlayTime = event.getAttribute(OAVTAttribute.deltaPlayTime) as number
        if (deltaPlayTime != null) {
            metricArray.push(OAVTMetric.PlayTime(deltaPlayTime))
        }
        
        return metricArray
    }

    instrumentReady(instrument: OAVTInstrument): void {
    }

    endOfService(): void {
    }
}
