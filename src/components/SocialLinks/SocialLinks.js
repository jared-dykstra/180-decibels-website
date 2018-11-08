import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faLinkedin,
  faFacebook,
  faMedium
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
    icon: faFacebook
  },
  {
    icon: faMedium
  }
]

export default () =>
  Object.entries(social).map(([i, s]) => (
    <NavItem key={i}>
      <NavLink href={s.url}>
        <FontAwesomeIcon icon={s.icon} />
      </NavLink>
    </NavItem>
  ))
