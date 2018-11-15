import React, { Component } from 'react'
import PropTypes from 'prop-types'
import he from 'he'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Container,
  Col,
  Row
} from 'reactstrap'
import { connect } from 'react-redux'

import { actions } from '../../redux/selfAssessment'
import {
  currentQuestionTextSelector,
  questionListSelector,
  currentIndexSelector,
  isFirstQuestionSelector,
  isLastQuestionSelector
} from '../../redux/selfAssessment/selfAssessmentSelectors'

import styles from './SelfAssessment.module.scss'

import VolumeButtons from './VolumeButtons'

class SelfAssessment extends Component {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    previousQuestion: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, text: PropTypes.string })
    ).isRequired,
    isFirstQuestion: PropTypes.bool.isRequired,
    isLastQuestion: PropTypes.bool.isRequired
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
    this.props.nextQuestion()
  }

  previous = () => {
    if (this.animating) {
      return
    }
    this.props.previousQuestion()
  }

  goToIndex(newIndex) {
    if (this.animating) {
      // return
    }
    // TODO: If arbitrary jumps are needed, dispatch an appropriate action here
  }

  render() {
    const {
      questions,
      activeIndex,
      isFirstQuestion,
      isLastQuestion
    } = this.props

    const slides = questions.asMutable().map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.id}
      >
        <div className={styles.panel}>
          {/* The he library is used to decode HTML character entities like &apos; */}
          <h2>{he.decode(item.text)}</h2>
          <div className={styles.buttons}>
            <VolumeButtons />
          </div>
        </div>
      </CarouselItem>
    ))

    return (
      <Container>
        <Row>
          <Col md={1} />
          <Col md={10}>
            <Carousel
              interval={false}
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators
                // key is set via 'src' field. https://stackoverflow.com/a/49418684/5373104
                items={questions.map(q => ({ src: q.id }))}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              {!isFirstQuestion && (
                <CarouselControl
                  direction="prev"
                  directionText="Previous"
                  onClickHandler={this.previous}
                />
              )}
              {!isLastQuestion && (
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

export default connect(
  (state /* , ownProps */) => ({
    questions: questionListSelector(state),
    currentQuestion: currentQuestionTextSelector(state),
    activeIndex: currentIndexSelector(state),
    isFirstQuestion: isFirstQuestionSelector(state),
    isLastQuestion: isLastQuestionSelector(state)
  }),
  dispatch => ({
    nextQuestion: () => dispatch(actions.nextQuestion()),
    previousQuestion: () => dispatch(actions.prevQuestion())
  })
)(SelfAssessment)
