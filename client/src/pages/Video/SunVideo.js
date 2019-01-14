import React from 'react'
import Video from './Video'

import { get as configGet } from '../../config'

const CDN = configGet('cdn')
export const src = `${CDN}/180DecibelsSunMetaphor_2.mp4`
export const poster = '/sun-video-poster.jpg'

const IntroVideo = props => (
  <Video
    {...{
      title: '180 Decibels - Introduction',
      poster,
      src,
      shareUrl: 'www.google.com',
      ...props
    }}
  />
)

export default IntroVideo