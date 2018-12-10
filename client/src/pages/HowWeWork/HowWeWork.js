import React from 'react'
import { Row, Col } from 'reactstrap'

import { Quote, Template } from 'components'

import styles from './HowWeWork.module.scss'

export default () => (
  <Template className={styles['how-we-work']}>
    <Row>
      <Col md={{ size: 10, offset: 1 }}>
        <h1>Our Unique Approach</h1>
        <p>
          <b>No people-skills required.</b> <i>You heard us right.</i> Our
          system does not depend on changing{' '}
          <b>
            <i>who</i>
          </b>{' '}
          you are as a person. Most management books/programs require you to
          unlock your people skills or to acquire magical powers of empathy. We
          don’t buy it. We can teach you to become a results-driven manager
          without changing who you are.
        </p>
        <p>
          <b>Blinding speed and powerful results.</b> Because we don’t rely on
          making you over, we can equip you with tools to create dramatic change
          within weeks, not years. That’s right, no deep dive, no ‘extended
          engagement’s, just a fast, valuable process with impressive ROI.
        </p>
        <p>
          <b>Flexible approach – online or in person support.</b> When your
          spouse asks you how your day was do you say, ‘hectic’, ‘crazy’,
          ‘constantly on the run’? We get it, time is precious - we can work in
          person or online.
        </p>
        <p>
          <a href="#">Get Started with our Unique Approach Today!</a>
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={{ size: 10, offset: 1 }}>
        <h1>Experience a 180</h1>
        <p className="lead">
          Do you want more respect? less conflict? higher morale? ...or All of
          these?
        </p>
        <p>
          we are uniquely qualified to help you turn the ship and experience a
          radical change in how you establish accountability and create a
          performance-driven culture.
        </p>
        <p>The highlights of how we roll-out include:</p>
      </Col>
    </Row>
    <Row>
      <Col md={{ size: 8, offset: 2 }}>
        <h3>Focus &amp; Alignment Session</h3>
        <p>
          First we determine what pieces of your process are working and not
          working and establish a framework that’s relevant for your company. We
          require at least two members of the executive for this part so that we
          get a true picture of your ecosystem.
        </p>
        <h3>Operationalization</h3>
        <p>
          (4 weeks) Then we turn strategy into tactics and install team-wide
          accountability
        </p>
        <h3>Installation</h3>
        <p>
          (8 weeks) Finally we will engrain a pattern of day-to-day discipline
          into your organization and turn you and your team into experts.
        </p>
        <h3>Creating Experts</h3>
        <p>
          We don’t just install the process and walk away. We make sure your
          team digests and internalizes the concepts and is using them with
          comfort DAILY.
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={{ size: 10, offset: 1 }}>
        <p>
          <a href="#">Experience a 180 Today!</a>
        </p>
        <Quote cite="Sarah, Manager">
          This process brought clarity and focus to our team. I was able to take
          alot OFF my plate. I now know what I am NOT accountable for. We even
          streamlined our meeting process and spent LESS time in meetings.
        </Quote>
      </Col>
    </Row>
  </Template>
)
