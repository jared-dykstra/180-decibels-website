import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { locationSelector } from '../../redux/routes/routesSelectors'

// ScrollToTop - see https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends PureComponent {
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
    const { location } = this.props
    if (location.hash) {
      const element = document.getElementById(location.hash)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        })
        return
      }
    }

    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children } = this.props
    return children
  }
}

export default connect(state => ({
  location: locationSelector(state)
}))(ScrollToTop)
