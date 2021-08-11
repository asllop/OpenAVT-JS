import { OAVTAction } from "./OAVTAction"
import { OAVTAttribute } from "./OAVTAttribute"
import { OAVTSample } from "./OAVTSample"
import { OAVTMap } from "../utils/OAVTMap"

/**
 * An OpenAVT Event.
 */
export class OAVTEvent extends OAVTSample {
    private action: OAVTAction
    private attributes: OAVTMap<OAVTAttribute, any> = new OAVTMap()

    /**
     * OAVTEvent constructor.
     * 
     * @param action Action.
     */
    constructor(action: OAVTAction) {
        super()
        this.action = action
    }

    /**
     * Get action.
     * 
     * @returns Action.
     */
    getAction(): OAVTAction {
        return this.action
    }

    /**
     * Get attribute.
     * 
     * @param attribute Attribute.
     * @returns Attribute value.
     */
    getAttribute(attribute: OAVTAttribute): any {
        return this.attributes.get(attribute)
    }

    /**
     * Set an attribute.
     * 
     * @param key Attribute.
     * @param value Value.
     */
    setAttribute(key: OAVTAttribute, value: any) {
        this.attributes.set(key, value)
    }

    /**
     * Remove attribute.
     * 
     * @param key Attribute.
     * @returns Boolean, true if attribute removed, false otherwise.
     */
    removeAttribute(key: OAVTAttribute): boolean {
        if (this.attributes.get(key) != null) {
            this.attributes.del(key)
            return true
        }
        else {
            return false
        }
    }

    /**
     * Get dictionary of attributes.
     * 
     * @returns Attributes.
     */
    getDictionary(): {[key: string]: any} {
        return this.attributes.dic()
    }
}