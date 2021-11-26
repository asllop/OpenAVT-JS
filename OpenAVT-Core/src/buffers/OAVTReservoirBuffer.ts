import { OAVTBuffer, OAVTSample } from "..";

/**
 * OpenAVT buffer with reservoir sampling, using the Algorithm R.
 */
export class OAVTReservoirBuffer extends OAVTBuffer {
    private samplingIndex : number = 0

    /**
     * OAVTBuffer constructor.
     * 
     * @param size Buffer size.
     */
    constructor(size: number) {
        super(size)
        this.samplingIndex = size
    }

    /**
     * Put sample.
     * 
     * @param sample An OAVTSample instance.
     * @returns True if added, false otherwise.
     */
    override put(sample: OAVTSample): boolean {
        if (this.remaining() > 0) {
            // Fill the buffer
            this.buffer.push(sample)
            return true
        }
        else {
            // Buffer is full, start random sampling
            let j = Math.floor(Math.random() * this.samplingIndex)
            this.samplingIndex = this.samplingIndex +  1
            if (j < this.size) {
                this.buffer[j] = sample
                return true
            }
            else {
                return false
            }
        }
    }

    /**
     * Obtain a copy of the buffer and flush.
     * 
     * @returns Buffer.
     */
    override retrieve(): OAVTSample[] {
        let x = super.retrieve()
        this.samplingIndex = this.size
        return x
    }
}
