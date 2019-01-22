/*
   This is a list of social media icons and their corresponding links
*/

import React from 'react'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faLinkedin,
  faFacebook,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

const social = [
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/company/180-decibels'
  },
  {
    icon: faTwitter,
    url: 'https://twitter.com/1Decibels'
  },
  {
    icon: faFacebook,
    url: 'https://www.facebook.com/180Decibels/'
  },
  {
    icon: faYoutube,
    url:
      'https://www.youtube.com/channel/UCtYhik05jpeBoxojuidHnow?view_as=subscriber'
  }
]

export default () => (
  <Grid container direction="row" justify="space-evenly" alignItems="center">
    {Object.entries(social).map(([i, s]) => (
      <Grid item key={i}>
        <a href={s.url}>
          <FontAwesomeIcon icon={s.icon} />
        </a>
      </Grid>
    ))}
  </Grid>
)
