import { OAVTSample } from "../models/OAVTSample"

/**
 * Buffer for samples.
 */
export class OAVTBuffer {
    private buffer : OAVTSample[] = []
    private size = 0

    /**
     * OAVTBuffer constructor.
     * 
     * @param size Buffer size.
     */
    constructor(size: number) {
        this.size = size
    }

    /**
     * Put sample.
     * 
     * @param sample An OAVTSample instance.
     * @returns True if added, false otherwise.
     */
    put(sample: OAVTSample): boolean {
        if (this.remaining() > 0) {
            this.buffer.push(sample)
            return true
        }
        else {
            return false
        }
    }

    /**
     * Set sample at position.
     * 
     * @param at Position.
     * @param sample An OAVTSample instance.
     * @returns True if set, false otherwise.
     */
    set(at: number, sample: OAVTSample): boolean {
        if (at < this.buffer.length) {
            this.buffer[at] = sample
            return true
        }
        else {
            return false
        }
    }

    /**
     * Get sample.
     * 
     * @param at Position.
     * @returns An OAVTSample instance.
     */
    get(at: number): OAVTSample {
        if (at < this.buffer.length) {
            return this.buffer[at]
        }
        else {
            return null
        }
    }

    /**
     * Obtain remaining space in the buffer.
     * 
     * @returns Remaining space.
     */
    remaining(): number {
        return this.size - this.buffer.length
    }

    /**
     * Obtain a copy of the buffer and flush.
     * 
     * @returns Buffer.
     */
    retrieve(): OAVTSample[] {
        let tmp = this.buffer
        this.buffer = []
        return tmp
    }

    /**
     * Obtain a copy of the buffer, ordered by timestamp, and flush.
     * 
     * @returns: Buffer.
     */
    retrieveInOrder(): OAVTSample[] {
        let tmp = this.retrieve()
        tmp.sort((A, B) => 
            (A.getTimestamp() > B.getTimestamp()) ? 1 : -1
        )
        return tmp
    }
}
