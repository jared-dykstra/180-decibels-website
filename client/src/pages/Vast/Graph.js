import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { graphSelector } from 'reduxStore/vast/vastSelectors'
import { layout } from 'reduxStore/vast/vastActions'

class Graph extends PureComponent {
  static propTypes = {
    graph: PropTypes.shape({
      mount: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired,
      resize: PropTypes.func.isRequired
    }).isRequired,
    doLayout: PropTypes.func.isRequired
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

  componentWillUnmount() {
    const { graph } = this.props
    if (graph) {
      graph.unmount()
    }
  }

  handleResize = () => {
    const { graph, doLayout } = this.props
    graph.resize()
    graph.fit()
    doLayout()
  }

  render() {
    return (
      <div
        style={{
          // TODO: How to avoid a fixed height?
          height: '100vh'
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
    graph: graphSelector(state)
  }),
  dispatch => ({
    doLayout: () => dispatch(layout())
  })
)(Graph)
