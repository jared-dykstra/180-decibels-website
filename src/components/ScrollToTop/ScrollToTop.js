import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { locationSelector } from '../../redux/routes/routesSelectors'

// ScrollToTop - see https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate')
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default connect(
  (state /* , ownProps */) => ({
    location: locationSelector(state)
  }),
  dispatch => ({
    // No events
  })
)(ScrollToTop)
