import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faLinkedin,
  faFacebook,
  faMedium
} from '@fortawesome/free-brands-svg-icons'
import { NavItem, NavLink } from 'reactstrap'

export default () => [
  <NavItem>
    <NavLink href="https://www.linkedin.com/company/180-decibels/">
      <FontAwesomeIcon icon={faLinkedin} />
    </NavLink>
  </NavItem>,
  <NavItem>
    <NavLink>
      <FontAwesomeIcon icon={faTwitter} />
    </NavLink>
  </NavItem>,
  <NavItem>
    <NavLink>
      <FontAwesomeIcon icon={faFacebook} />
    </NavLink>
  </NavItem>,
  <NavItem>
    <NavLink>
      <FontAwesomeIcon icon={faMedium} />
    </NavLink>
  </NavItem>
]
