import React, { Component } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Container,
  Col,
  Row
} from 'reactstrap'

import styles from './SelfAssessment.module.scss'

import { questionsPropType } from '../../propTypes'

import Intro from './Intro'
import Question from './Question'
import Results from './Results'

export default class SelfAssessment extends Component {
  static propTypes = {
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
    const { questions } = this.props
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
          <Question questionId={question.id} questionText={question.text} />
        </CarouselItem>
      )),
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key="results"
      >
        <Results />
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
            <Results />
          </Col>
          <Col md={4} />
        </Row>
      </Container>
    )
  }
}
