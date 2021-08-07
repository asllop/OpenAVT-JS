export { OAVTTrackerJWPlayer } from './trackers/OAVTTrackerJWPlayer'
import { OAVTTrackerJWPlayer as Tracker } from './trackers/OAVTTrackerJWPlayer'
import * as OpenAVT from 'openavt-core-js'

OpenAVT["OAVTTrackerJWPlayer"] = Tracker
module.exports = OpenAVT