/*
   This is a list of social media icons and their corresponding links
*/

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faLinkedin,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'
import { NavItem, NavLink } from 'reactstrap'

const social = [
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/company/180-decibels'
  },
  {
    icon: faTwitter
  },
  {
    icon: faFacebook,
    url: 'https://www.facebook.com/180Decibels/'
  }
]

export default () => (
  <span className="d-none d-md-flex">
    {Object.entries(social).map(([i, s]) => (
      <NavItem key={i}>
        <NavLink href={s.url}>
          <FontAwesomeIcon icon={s.icon} />
        </NavLink>
      </NavItem>
    ))}
  </span>
)
