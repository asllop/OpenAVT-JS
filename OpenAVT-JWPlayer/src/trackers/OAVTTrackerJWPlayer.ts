import { OAVTEvent, OAVTInstrument, OAVTLog, OAVTState, OAVTTrackerInterface } from 'openavt-core'

export class OAVTTrackerJWPlayer implements OAVTTrackerInterface {
    initEvent(event: OAVTEvent): OAVTEvent {
        OAVTLog.debug("JWPlayer Tracker received event = ", event)
        return event
    }
    
    trackerId: number;
    state: OAVTState = new OAVTState();

    instrumentReady(instrument: OAVTInstrument): void {
        OAVTLog.debug("JWPlayer Tracker instrumentReady")
    }

    endOfService(): void {
        OAVTLog.debug("JWPlayer Tracker endOfService")
    }
}