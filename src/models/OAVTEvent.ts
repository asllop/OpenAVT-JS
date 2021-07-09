import { OAVTAction } from "./OAVTAction";
import { OAVTAttribute } from "./OAVTAttribute";
import { OAVTSample } from "./OAVTSample";

/**
 * An OpenAVT Event.
 */
export class OAVTEvent extends OAVTSample {
    private action: OAVTAction
    private attributes: {[key: string]: any} = {}

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
    getAttibute(attribute: OAVTAttribute): any {
        return this.attributes[attribute.getAttributeName()]
    }

    /**
     * Set an attribute.
     * 
     * @param key Attribute.
     * @param value Value.
     */
    setAttribute(key: OAVTAttribute, value: any) {
        this.attributes[key.getAttributeName()] = value
    }

    /**
     * Remove attribute.
     * 
     * @param key Attribute.
     * @returns Boolean, true if attribute removed, false otherwise.
     */
    removeAttribute(key: OAVTAttribute): boolean {
        if (this.attributes[key.getAttributeName()] != null) {
            delete this.attributes[key.getAttributeName()]
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
        return this.attributes
    }
}