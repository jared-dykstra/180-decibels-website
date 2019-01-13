import React from 'react'
import Video from './Video'

import { get as configGet } from '../../config'

import sunPoster from './sun-video-poster.jpg'

const CDN = configGet('cdn')
export const src = `${CDN}/180DecibelsOverview1.2.mp4`

const IntroVideo = () => (
  <Video
    {...{
      title: '180 Decibels - Introduction',
      poster: sunPoster,
      src
    }}
  />
)

export default IntroVideo

export const poster = sunPoster
