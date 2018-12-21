import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap'

import { Paper } from '@material-ui/core'

import { questionsPropType, responsesPropType } from 'propTypes'
import {
  questionListSelector,
  responsesSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

import styles from './SelfAssessment.module.scss'
import Intro from './Intro'
import Question from './Question'
import Results from './Results'
import EmailMe from './EmailMe'

class SelfAssessment extends PureComponent {
  static propTypes = {
    assessmentName: PropTypes.string.isRequired,
    questions: questionsPropType.isRequired,
    responses: responsesPropType.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      animating: false,
      currentIndex: 0
    }
  }

  onExiting = () => {
    this.setState(() => ({
      animating: true
    }))
  }

  onExited = () => {
    this.setState(() => ({
      animating: false
    }))
  }

  next = () => {
    const { animating } = this.state
    if (animating) {
      return
    }
    this.setState(currentState => ({
      currentIndex: currentState.currentIndex + 1
    }))
  }

  previous = () => {
    const { animating } = this.state
    if (animating) {
      return
    }
    this.setState(currentState => ({
      currentIndex: currentState.currentIndex - 1
    }))
  }

  render() {
    const { assessmentName, questions, responses } = this.props
    const { currentIndex } = this.state
    const indicatorPadding = styles['var-control-width']

    const introSlides = [
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="intro"
      >
        <Intro next={this.next} />
      </CarouselItem>
    ]

    const resultSlides = [
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="register"
      >
        <div
          style={{
            paddingLeft: indicatorPadding,
            paddingRight: indicatorPadding
          }}
        >
          <h2>Get your Report</h2>
          <EmailMe />
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

    const slides = [
      ...introSlides,
      ...questions.map(question => (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={question.id}
        >
          {/* Padding prevents content from being rendered behind carousel controls */}
          <div
            style={{
              paddingLeft: indicatorPadding,
              paddingRight: indicatorPadding
            }}
          >
            <Question
              assessmentName={assessmentName}
              questionId={question.id}
              questionText={question.text}
              next={this.next}
            />
          </div>
        </CarouselItem>
      )),
      ...resultSlides
    ]

    // TODO: Get some unit test coverage on this block of logic by refactoring it out of render()
    const isFirstSlide = currentIndex <= 0
    const currentQuestion =
      currentIndex >= introSlides.length &&
      currentIndex < questions.length + introSlides.length
        ? questions[currentIndex - introSlides.length]
        : undefined
    const currentResponse = currentQuestion
      ? responses[currentQuestion.id]
      : undefined
    const currentQuestionHasBeenRespondedTo = currentResponse
      ? currentResponse.hasBeenRespondedTo
      : undefined
    const canAdvanceSlide = isFirstSlide || currentQuestionHasBeenRespondedTo

    return (
      <Paper>
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
            onClickHandler={() => {}}
          />
          {slides}
          {!isFirstSlide && (
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
          )}
          {canAdvanceSlide && (
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          )}
        </Carousel>
      </Paper>
    )
  }
}

export default connect((state, props) => ({
  questions: questionListSelector(state, props),
  responses: responsesSelector(state, props)
}))(SelfAssessment)
