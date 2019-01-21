import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  graphSelector,
  graphLayoutSelector
} from 'reduxStore/vast/vastSelectors'

class Graph extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    graph: PropTypes.object.isRequired,
    layout: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.ref = null
  }

  // Mount the graph (previously running headless)
  componentDidMount() {
    if (this.ref) {
      const { graph } = this.props
      graph.mount(this.ref)
    }
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  // componentDidUpdate(prevProps) {}

  componentWillUnmount() {
    const { graph } = this.props
    if (graph) {
      graph.unmount()
    }
  }

  handleResize = () => {
    const { graph, layout } = this.props
    graph.resize()
    graph.layout(layout).run()
    // graph.fit()
  }

  render() {
    return (
      <div
        style={{
          height: '800px',
          display: 'block'
        }}
        ref={ref => {
          this.ref = ref
        }}
      />
    )
  }
}

export default connect(
  state => ({
    graph: graphSelector(state),
    layout: graphLayoutSelector(state)
  }),
  dispatch => ({})
)(Graph)
