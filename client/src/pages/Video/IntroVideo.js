import React from 'react'
import { ROUTE_VIDEO_INTRO } from 'reduxStore/routes/routesConstants'
import Video from './Video'

import { get as configGet } from '../../config'

const CDN = configGet('cdn')
const rootUrl = configGet('rootUrl')
export const src = `${CDN}/180DecibelsOverview1.2.mp4`
export const poster = '/overview-video-poster2.jpg'

const IntroVideo = props => (
  <Video
    {...{
      title: '180 Decibels - Introduction',
      poster,
      src,
      shareUrl: `${rootUrl}${ROUTE_VIDEO_INTRO}`,
      ...props
    }}
  />
)

export default IntroVideo
