import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Container,
  Col,
  Row
} from 'reactstrap'

import { LogIn } from 'components'
import { questionsPropType } from 'propTypes'
import { questionListSelector } from 'redux/selfAssessment/selfAssessmentSelectors'

import styles from './SelfAssessment.module.scss'
import Intro from './Intro'
import Question from './Question'
import Results from './Results'

class SelfAssessment extends Component {
  static propTypes = {
    assessmentName: PropTypes.string.isRequired,
    questions: questionsPropType.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0
    }
  }

  onExiting = () => {
    this.animating = true
  }

  onExited = () => {
    this.animating = false
  }

  next = () => {
    if (this.animating) {
      return
    }

    this.setState(currentState => ({
      currentIndex: currentState.currentIndex + 1
    }))
  }

  previous = () => {
    if (this.animating) {
      return
    }
    this.setState(currentState => ({
      currentIndex: currentState.currentIndex - 1
    }))
  }

  goToIndex(newIndex) {
    if (this.animating) {
      // return
    }
    // TODO: If arbitrary jumps are needed, dispatch an appropriate action here
  }

  render() {
    const { assessmentName, questions } = this.props
    const { currentIndex } = this.state

    const slides = [
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="intro"
      >
        <Intro next={this.next} />
      </CarouselItem>,
      ...questions.map(question => (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={question.id}
        >
          <Question
            assessmentName={assessmentName}
            questionId={question.id}
            questionText={question.text}
          />
        </CarouselItem>
      )),
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="register"
      >
        <h2>
          Tell us a bit about yourself. We will send a report with tools you can
          start using today!
        </h2>
        <div className={styles.register}>
          <LogIn />
        </div>
      </CarouselItem>,
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="results"
      >
        <Results assessmentName={assessmentName} />
      </CarouselItem>
    ]

    const isFirstSlide = currentIndex <= 0
    const isLastSlide = currentIndex >= slides.length - 1

    return (
      <Container>
        <Row>
          <Col md={1} />
          <Col md={10}>
            <Carousel
              interval={false}
              activeIndex={currentIndex}
              next={this.next}
              previous={this.previous}
              className={styles.carousel}
            >
              <CarouselIndicators
                // key is set via 'src' field. https://stackoverflow.com/a/49418684/5373104
                items={slides.map(s => ({ src: s.key }))}
                activeIndex={currentIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              {!isFirstSlide && (
                <CarouselControl
                  direction="prev"
                  directionText="Previous"
                  onClickHandler={this.previous}
                />
              )}
              {!isLastSlide && (
                <CarouselControl
                  direction="next"
                  directionText="Next"
                  onClickHandler={this.next}
                />
              )}
            </Carousel>
          </Col>
          <Col md={4} />
        </Row>
      </Container>
    )
  }
}

export default connect((state, props) => ({
  questions: questionListSelector(state, props)
}))(SelfAssessment)
