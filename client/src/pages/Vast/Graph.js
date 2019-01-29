import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { graphSelector } from 'reduxStore/vast/vastSelectors'
import { layout } from 'reduxStore/vast/vastActions'

class Graph extends PureComponent {
  static propTypes = {
    // viewId is used in connect (below)
    // eslint-disable-next-line react/no-unused-prop-types
    viewId: PropTypes.string.isRequired,
    graph: PropTypes.shape({
      mount: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired,
      resize: PropTypes.func.isRequired
    }).isRequired,
    doLayout: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
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
    const { className } = this.props
    return (
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
        className={className}
        ref={ref => {
          this.ref = ref
        }}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    graph: graphSelector(state, props)
  }),
  (dispatch, props) => ({
    doLayout: () => dispatch(layout(props))
  })
)(Graph)
