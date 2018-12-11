import React from 'react'
import { Col, Row } from 'reactstrap'

import { Quote, Template } from 'components'

import styles from './OurTeam.module.scss'
import dayton from './dayton.jpg'
import kerri from './kerri.jpg'
import jared from './jared.jpg'

export default () => (
  <Template className={styles['our-team']}>
    <h1>Our Team</h1>
    <Row>
      <Col md={{ size: 10, offset: 1 }}>
        <p>
          Our founders are come-from-the trenches managers who have developed
          and built products and services, grown (and shrunk) teams in
          high-growth (and stagnant) environments and faced most of the
          challenges you have either experienced or imagined.
        </p>
        <p>
          We&apos;ve pivoted, down-sized, right-sized, re-vectored, in-sourced,
          out-sourced and been in and out of the box. Now, smarter and wiser, we
          have distilled our experiences into one efficient process that teaches
          overworked, frustrated managers with underperforming teams how to get
          on track.
        </p>
      </Col>
    </Row>

    <h2>Founders</h2>
    <hr />

    <div className={styles.founder}>
      <Row>
        <Col sm="6" md={{ size: 4, offset: 1 }}>
          <img
            src={dayton}
            alt="Dayton Foster"
            className="rounded img-fluid img-thumbnail float-right"
          />
        </Col>
        <Col sm="6" md={{ size: 4, offset: 0 }}>
          <h2>
            <small className="text-muted">Dayton Foster</small>
          </h2>
          <p>
            Dayton has a deep operational background managing high growth
            companies from start-up to exit. He is fanatical about learning and
            implementing world-class operational practices.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Quote
            right
            className={`h5 ${styles.quote}`}
            cite="Chris, Board Chair"
          >
            Dayton brings an abundance of obvious business experience in a well
            thought out package and exposed us to the kinds of questions we
            should be asking. He helped us focus on the most important issues
            and kept us from becoming mired in too much extraneous detail.
          </Quote>
        </Col>
      </Row>
    </div>

    <div className={styles.founder}>
      <Row>
        <Col sm="6" md={{ size: 4, offset: 1 }}>
          <img
            src={kerri}
            alt="Kerri McGovern"
            className="rounded img-fluid img-thumbnail float-right"
          />
        </Col>
        <Col sm="6" md={{ size: 4, offset: 0 }}>
          <h2>
            <small className="text-muted">Kerri McGovern</small>
          </h2>
          <p>
            Kerri has deep experience in high growth, venture-backed technology
            start-ups nationwide. She has a proven ability to initiate and build
            customer relationships, develop and motivate teams, and create
            urgency in organizations. Her straightforward, results-based
            approach to serving clients is matched only by her empathy and
            concern for affecting real change.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Quote right className={`h5 ${styles.quote}`} cite="Derek, CEO">
            Kerri is an exceptionally talented individual who expertly seized
            and and excelled with any aspect of the business that I asked her to
            tackle. She has a remarkable ability to connect with her team, her
            peers, and all the key stakeholders of the venture, both internal
            and external.
          </Quote>
        </Col>
      </Row>
    </div>

    <div className={styles.founder}>
      <Row>
        <Col sm="6" md={{ size: 4, offset: 1 }}>
          <img
            src={jared}
            alt="Jared Dykstra"
            className="rounded img-fluid img-thumbnail float-right"
          />
        </Col>
        <Col sm="6" md={{ size: 4, offset: 0 }}>
          <h2>
            <small className="text-muted">Jared Dykstra</small>
          </h2>
          <p>
            Jared is a rare talent that imagines how to support real-world
            business process with technology tools. He is technical visionary
            meets business street smarts. From data to web, project to product,
            Jared maxes out value and turns vision into reality. He came to 180
            after building a blockchain platform for an industry front-runner.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Quote right className={`h5 ${styles.quote}`} cite="Mike, CTO">
            Jared is passionate about software development and has a broad and
            deep range of technical skills spanning hardware, software,
            infrastructure, and the processes to support solution development.
            Jared has architected and implemented many solutions, all
            successfully delivered into production.
          </Quote>
        </Col>
      </Row>
    </div>
  </Template>
)
