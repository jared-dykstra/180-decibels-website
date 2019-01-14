import React from 'react'
import { ROUTE_VIDEO_SUN } from 'reduxStore/routes/routesConstants'
import Video from './Video'

import { get as configGet } from '../../config'

const CDN = configGet('cdn')
const rootUrl = configGet('rootUrl')
export const src = `${CDN}/180DecibelsSunMetaphor_2.mp4`
export const poster = '/sun-video-poster.jpg'

const IntroVideo = props => (
  <Video
    {...{
      title: '180 Decibels - Introduction',
      poster,
      src,
      shareUrl: `${rootUrl}${ROUTE_VIDEO_SUN}`,
      ...props
    }}
  />
)

export default IntroVideo
