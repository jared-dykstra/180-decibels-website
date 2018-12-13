import React from 'react'
import { Button, Row, Col } from 'reactstrap'
import { Helmet } from 'react-helmet'

import { GetStarted, Quote, Template } from 'components'

import styles from './HowWeWork.module.scss'

export default () => (
  <Template className={styles['how-we-work']}>
    <Helmet>
      <title>180 Decibels - How We Work</title>
      <meta
        name="description"
        content="Do you want more respect? less conflict? Get results without changing who you are as a person"
      />
    </Helmet>
    <Row>
      <Col md={{ size: 10, offset: 1 }}>
        <section id="approach" className="p-3">
          <h1>Our Unique Approach</h1>
          <h2>No people-skills required</h2>
          <Col md={{ size: 11, offset: 1 }}>
            <p>
              <i>You heard us right.</i> Our system does not depend on changing{' '}
              <b>
                <i>who</i>
              </b>{' '}
              you are as a person. Most management books/programs require you to
              unlock your people skills or to acquire magical powers of empathy.
              We don’t buy it. We can teach you to become a results-driven
              manager without changing who you are.
            </p>
          </Col>
          <h2>Blinding speed and powerful results</h2>
          <Col md={{ size: 11, offset: 1 }}>
            <p>
              Because we don’t rely on making you over, we can equip you with
              tools to create dramatic change within weeks, not years. That’s
              right, no deep dive, no ‘extended engagement’s, just a fast,
              valuable process with impressive ROI.
            </p>
          </Col>
          <h2>Flexible approach</h2>
          <Col md={{ size: 11, offset: 1 }}>
            <p>
              <b>Online or In-person support.</b> When your spouse asks you how
              your day was do you say, ‘hectic’, ‘crazy’, ‘constantly on the
              run’? We get it, time is precious - we can work in person or
              online.
            </p>
          </Col>
          <Col xs="12" className="d-flex">
            <GetStarted size="lg" className="ml-auto">
              Get Started with our Unique Approach Today!
            </GetStarted>
          </Col>
        </section>
        <Quote cite="Sarah, Manager" className="pb-3 pt-5">
          This process brought clarity and focus to our team. I was able to take
          alot OFF my plate. I now know what I am NOT accountable for. We even
          streamlined our meeting process and spent LESS time in meetings.
        </Quote>
        <section id="experience" className="p-3">
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
          <h2>Focus &amp; Alignment Session</h2>
          <Col md={{ size: 11, offset: 1 }}>
            <p>
              First we determine what pieces of your process are working and not
              working and establish a framework that’s relevant for your
              company. We require at least two members of the executive for this
              part so that we get a true picture of your ecosystem.
            </p>
          </Col>
          <h2>Operationalization</h2>
          <Col md={{ size: 11, offset: 1 }}>
            <p>
              (4 weeks) Then we turn strategy into tactics and install team-wide
              accountability
            </p>
          </Col>
          <h2>Installation</h2>
          <Col md={{ size: 11, offset: 1 }}>
            <p>
              (8 weeks) Finally we will engrain a pattern of day-to-day
              discipline into your organization and turn you and your team into
              experts.
            </p>
          </Col>
          <h2>Creating Experts</h2>
          <Col md={{ size: 11, offset: 1 }}>
            <p>
              We don’t just install the process and walk away. We make sure your
              team digests and internalizes the concepts and is using them with
              comfort DAILY.
            </p>
          </Col>
          <Col xs="12" className="d-flex">
            <GetStarted size="lg" className="ml-auto">
              Experience a 180 Today!
            </GetStarted>
          </Col>
        </section>
      </Col>
    </Row>
  </Template>
)
