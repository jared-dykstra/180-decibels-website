import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// TODO: Remove ReactStrap (Carousel) and remove bootstrap
import 'styles/theme.scss'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap'
import Swipeable from 'react-swipeable'

import { DialogContentText } from '@material-ui/core'

import { questionsPropType, responsesPropType } from 'propTypes'
import {
  questionListSelector,
  responsesSelector,
  currentSlideSelector,
  initializedSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'
import {
  initialize,
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
    isInitialized: PropTypes.bool.isRequired,
    questions: questionsPropType.isRequired,
    responses: responsesPropType.isRequired,
    currentIndex: PropTypes.number.isRequired,
    doInitialize: PropTypes.func.isRequired,
    doPrevSlide: PropTypes.func.isRequired,
    doNextSlide: PropTypes.func.isRequired,
    tracker: PropTypes.shape({
      event: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      animating: false
    }

    props.doInitialize()
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
    const {
      id,
      assessmentName,
      isInitialized,
      questions,
      responses,
      currentIndex,
      tracker
    } = this.props
    const indicatorPadding = styles['var-control-width']

    const introSlides = [
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="intro"
      >
        <Intro {...{ assessmentName, next: this.next, tracker }} />
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
          <h2 style={{ marginTop: '0' }}>Your Results are Ready</h2>
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
              hintHigh={question.promptRight}
              hintLow={question.promptLeft}
              tracker={tracker}
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
    const canAdvanceSlide =
      isInitialized && (isFirstSlide || currentQuestionHasBeenRespondedTo)

    return (
      <div id={id}>
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
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    questions: questionListSelector(state, props),
    responses: responsesSelector(state, props),
    currentIndex: currentSlideSelector(state, props),
    isInitialized: initializedSelector(state, props)
  }),
  (dispatch, props) => ({
    doInitialize: () => dispatch(initialize(props)),
    doNextSlide: () => dispatch(nextSlide(props)),
    doPrevSlide: () => dispatch(prevSlide(props))
  })
)(SelfAssessment)
