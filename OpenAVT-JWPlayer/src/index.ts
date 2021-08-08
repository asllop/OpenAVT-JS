export { OAVTTrackerJWPlayer } from './trackers/OAVTTrackerJWPlayer'
import { OAVTTrackerJWPlayer } from './trackers/OAVTTrackerJWPlayer'
import * as OpenAVT from 'openavt-core'

OpenAVT["OAVTTrackerJWPlayer"] = OAVTTrackerJWPlayer
module.exports = OpenAVT