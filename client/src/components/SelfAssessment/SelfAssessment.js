import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Swiper from 'react-id-swiper/lib/custom'

import { Button, Paper } from '@material-ui/core'

import { questionsPropType, responsesPropType } from 'propTypes'
import {
  questionListSelector,
  responsesSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

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

  static getDerivedStateFromProps(props, state) {
    const { assessmentName, questions } = props
    const { swiper } = state
    const next = () => (swiper ? swiper.slideNext() : () => {})

    const introSlides = [
      <div key="intro">
        <Intro next={next} />
      </div>
    ]

    const resultSlides = [
      <div key="register">
        <h2>Get your Report</h2>
        <EmailMe />
      </div>,
      <div key="results">
        <Results assessmentName={assessmentName} />
      </div>
    ]

    const questionSlides = questions.map(question => (
      <div key={question.id}>
        <Question
          assessmentName={assessmentName}
          questionId={question.id}
          questionText={question.text}
          next={next}
        />
      </div>
    ))

    return {
      introSlides,
      resultSlides,
      questionSlides
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      swiper: null
    }
  }

  updateSwiper = () => {
    const { questions, responses } = this.props
    const { swiper, introSlides } = this.state

    if (!swiper) {
      return
    }

    // TODO: Get some unit test coverage on this block of logic by refactoring it out of here
    const currentIndex = swiper.activeIndex
    const isFirstSlide = swiper.isBeginning
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

    // Update the state of the slider
    swiper.allowSlideNext = canAdvanceSlide
    swiper.allowSlidePrev = !isFirstSlide
  }

  componentDidUpdate = () => {
    this.updateSwiper()
  }

  render() {
    const { swiper, introSlides, questionSlides, resultSlides } = this.state
    const slides = [...introSlides, ...questionSlides, ...resultSlides]

    return (
      <Paper>
        <Swiper
          ref={node => {
            // Set the ref, if not previously set
            if (node && !swiper)
              this.setState(() => ({
                swiper: node.swiper
              }))
          }}
          {...{
            on: {
              slideChange: this.updateSwiper
            },
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          }}
        >
          {slides}
          {/* <Button onClick={this.next}>Next</Button>
          <Button onClick={this.previous}>Previous</Button> */}
        </Swiper>
      </Paper>
    )
  }
}

export default connect((state, props) => ({
  questions: questionListSelector(state, props),
  responses: responsesSelector(state, props)
}))(SelfAssessment)
