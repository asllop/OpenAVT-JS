import { OAVTInstrument } from "../OAVTInstrument"

/**
 * OpenAVT base interface for instrument components.
 */
export interface OAVTComponentInterface {
   /**
    * Instrument is ready. Called when the user executes `OAVTInstrument.ready()`.
    * @param instrument 
    */
    instrumentReady(instrument: OAVTInstrument): void
    
    /**
     * End of service. Called when a component is removed from the instrument or when `OAVTInstrument.shutdown()` is called.
     */
    endOfService(): void
}