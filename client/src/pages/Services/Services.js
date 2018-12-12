import React from 'react'
import { Button, Row, Col } from 'reactstrap'

import { Template } from 'components'

import styles from './Services.module.scss'

export default () => (
  <Template className={styles.services}>
    <Row>
      <Col md={{ size: 10, offset: 1 }}>
        <h1>Services</h1>
        <p className="lead">
          Our services are custom for each client AND everything we do is
          centred around implementing best practices to create healthy, high
          performing teams to maximize revenue, optimize costs and create more
          wealth and success.
        </p>
        <h2>Operations</h2>
        <Col md={{ size: 11, offset: 1 }}>
          <p>
            Specifically, the People side of Ops. As managers we really only
            have one accountability: to get the maximum amount of productivity
            out of our teams at the lowest cost possible. We tend to make it
            more complicated but essentially, that is it, right? We work with
            clients to remove complexity and get there quickly and easily.
            People are “messy” we help to remove the messiness.
          </p>
        </Col>

        <h2>Organization and Team Health</h2>
        <Col md={{ size: 11, offset: 1 }}>
          <p>
            Unhealthy teams produce mediocre results at best. “Health” sounds
            vague, but it is easy to measure. Healthy teams have minimal
            politics and confusion, have high morale and productivity and very
            low turnover of good people. If this sounds slippery or
            touchy-feely, we understand. Our mission is to remove the complexity
            from
          </p>
        </Col>

        <h2>Enterprise Performance Management</h2>
        <Col md={{ size: 11, offset: 1 }}>
          <p>
            To us, this is just a fancy phrase that can be simplified. To
            measure performance deliberately setting measurable short-term goals
            through the lens of long-term objectives. For the company,
            departments and individuals and, measuring progress and keeping each
            other accountable.
          </p>
        </Col>

        <h2>People Advisory Services</h2>
        <Col md={{ size: 11, offset: 1 }}>
          <p>
            Rapid speed of innovation, for many industries, has reduced the
            advantage that we used to get from technology or product cycles
            alone. It has become clear that the most competitive and successful
            organizations are that way because of their people. Every
            organization should know how to gain a competitive advantage through
            its people. In our world knowing whether you have the right people
            in the right roles can actually be an objective exercise. We help
            clients analyze their people through the lenses of long-term
            objectives, short term objectives, values and unique role
            accountabilities, among other factors. In parallel, we engage team
            members and nurture the culture to create the right environment for
            a high performing team.
          </p>
        </Col>
        <Button size="lg" color="primary">
          Get Started with 180 Decibels Today!
        </Button>
      </Col>
    </Row>
  </Template>
)
