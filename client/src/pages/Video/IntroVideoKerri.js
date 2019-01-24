import React from 'react'
import { ROUTE_VIDEO_INTRO_KERRI } from 'reduxStore/routes/routesConstants'
import Video from './Video'

import { get as configGet } from '../../config'

const CDN = configGet('cdn')
const rootUrl = configGet('rootUrl')
export const src = `${CDN}/180Decibels+Intro+Kerri.mp4`
export const poster = '/intro-video-kerri-poster.jpg'

const IntroVideoKerri = props => (
  <Video
    {...{
      title: '180 Decibels - Overview',
      poster,
      src,
      shareUrl: `${rootUrl}${ROUTE_VIDEO_INTRO_KERRI}`,
      aspectRatio: 'auto',
      ...props
    }}
  />
)

export default IntroVideoKerri
