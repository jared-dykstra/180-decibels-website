import React from 'react'
import { Button } from 'reactstrap'

import './Home.scss'

import { Logo, Template } from '../../components'

export default () => (
  <Template>
    <section className="section-splash">
      <Logo />
      <h1>180 Decibels</h1>
      <p>Management Consulting for the Modern Manager</p>
    </section>
    <section className="section-help-my-team">
      <h2 className="action">Help My Team</h2>
      <p>
        Are you a manager or leader who is frustrated by your team’s results? Is
        there confusion on who is accountable for what? Do team members KNOW
        what they need to do EACH DAY to meet targets? IF THIS SOUNDS LIKE YOUR
        COMPANY, WE GET IT AND WE CAN HELP.
      </p>
      <Button>Discover what 180 Decibels can do for your team</Button>
    </section>
    <section className="section-help-me">
      <h2 className="action">Help Me</h2>
      <p>
        We re-focus managers on driving to outcome and on creating urgency. We
        offer a practical, results-oriented process to build a high-performing
        culture so you can start feeling more competent and more
        confident--getting huge productivity gains out of your team.
      </p>
      <Button>Discover how 180 Decibels can help you</Button>
    </section>
    {/*
      <section>
        <h2>Organizations using 180 Decibels</h2>
        <Carousel />
      </section>
    */}
  </Template>
)
