import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap'
import Swipeable from 'react-swipeable'

import { DialogContentText, Paper } from '@material-ui/core'

import { questionsPropType, responsesPropType } from 'propTypes'
import {
  questionListSelector,
  responsesSelector,
  currentSlideSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'
import {
  nextSlide,
  prevSlide
} from 'reduxStore/selfAssessment/selfAssessmentActions'

import styles from './SelfAssessment.module.scss'
import Intro from './Intro'
import Question from './Question'
import Results from './Results'
import EmailMe from './EmailMe'

class SelfAssessment extends PureComponent {
  static propTypes = {
    assessmentName: PropTypes.string.isRequired,
    questions: questionsPropType.isRequired,
    responses: responsesPropType.isRequired,
    currentIndex: PropTypes.number.isRequired,
    doPrevSlide: PropTypes.func.isRequired,
    doNextSlide: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      animating: false
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
    const { doNextSlide } = this.props
    const { animating } = this.state
    if (animating) {
      return
    }
    doNextSlide()
  }

  previous = () => {
    const { doPrevSlide } = this.props
    const { animating } = this.state
    if (animating) {
      return
    }
    doPrevSlide()
  }

  render() {
    const { assessmentName, questions, responses, currentIndex } = this.props
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
          <h2>Your Results are Ready</h2>
          <DialogContentText>
            Thanks for taking the time to answer these questions. A report is
            ready for you, which contains concrete, actionable steps that you
            can immediately use.
          </DialogContentText>
          <EmailMe {...{ assessmentName }} />
        </div>
      </CarouselItem>,
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="results"
      >
        <Results {...{ assessmentName }} />
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
      <Paper elevation={6}>
        <Swipeable
          onSwipingLeft={() => (canAdvanceSlide ? this.next() : undefined)}
          onSwipingRight={() => (!isFirstSlide ? this.previous() : undefined)}
          stopPropagation
          trackMouse
        >
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
        </Swipeable>
      </Paper>
    )
  }
}

export default connect(
  (state, props) => ({
    questions: questionListSelector(state, props),
    responses: responsesSelector(state, props),
    currentIndex: currentSlideSelector(state, props)
  }),
  (dispatch, props) => ({
    doNextSlide: () => dispatch(nextSlide(props)),
    doPrevSlide: () => dispatch(prevSlide(props))
  })
)(SelfAssessment)
