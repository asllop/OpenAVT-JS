export { OAVTTrackerJWPlayer } from './trackers/OAVTTrackerJWPlayer'
export { OAVTTrackerJWPlayerAds } from './trackers/OAVTTrackerJWPlayerAds'
import { OAVTTrackerJWPlayer } from './trackers/OAVTTrackerJWPlayer'
import { OAVTTrackerJWPlayerAds } from './trackers/OAVTTrackerJWPlayerAds'
import * as OpenAVT from 'openavt-core'

OpenAVT["OAVTTrackerJWPlayer"] = OAVTTrackerJWPlayer
OpenAVT["OAVTTrackerJWPlayerAds"] = OAVTTrackerJWPlayerAds

module.exports = OpenAVT