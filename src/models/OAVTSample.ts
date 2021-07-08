/**
 * OpenAVT sample.
 */
export class OAVTSample {
    private timestamp: number

    constructor() {
        this.timestamp = new Date().getTime()
    }

    /**
     * Get sample timestamp.
     * 
     * @returns Timestamp.
     */
    getTimestamp(): number {
        return this.timestamp
    }

    /**
     * Set sample timestamp.
     * 
     * @param timestamp Timestamp.
     */
    setTimestamp(timestamp: number) {
        this.timestamp = timestamp
    }
}