import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap'

import { LogIn } from 'components'
import { questionsPropType, responsesPropType } from 'propTypes'
import {
  questionListSelector,
  responsesSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

import styles from './SelfAssessment.module.scss'
import Intro from './Intro'
import Question from './Question'
import Results from './Results'

class SelfAssessment extends PureComponent {
  static propTypes = {
    assessmentName: PropTypes.string.isRequired,
    questions: questionsPropType.isRequired,
    responses: responsesPropType.isRequired
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      currentIndex: 0
    })
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

    this.setState(currentState =>
      Immutable.from({
        currentIndex: currentState.currentIndex + 1
      })
    )
  }

  previous = () => {
    if (this.animating) {
      return
    }
    this.setState(currentState =>
      Immutable.from({
        currentIndex: currentState.currentIndex - 1
      })
    )
  }

  render() {
    const { assessmentName, questions, responses } = this.props
    const { currentIndex } = this.state

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
        <h2>
          Tell us a bit about yourself. We will send a report with tools you can
          start using today!
        </h2>
        <div className={styles.register}>
          <LogIn signInText="Sign In" resetText="Reset" />
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
          <Question
            assessmentName={assessmentName}
            questionId={question.id}
            questionText={question.text}
            next={this.next}
          />
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
          onClickHandler={e => e.stopPropagation()}
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
    )
  }
}

export default connect((state, props) => ({
  questions: questionListSelector(state, props),
  responses: responsesSelector(state, props)
}))(SelfAssessment)
