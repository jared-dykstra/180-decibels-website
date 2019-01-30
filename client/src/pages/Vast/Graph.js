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
    // console.log(`Graph Constructor ${props.viewId}`)
    this.ref = null
  }

  // Mount the graph (previously running headless)
  componentDidMount() {
    // console.log(`Graph componentDidMount ${this.props.viewId}`)
    if (this.ref) {
      const { graph } = this.props
      if (graph) {
        graph.mount(this.ref)
        graph.resize()
        graph.fit()
        // Don't run the layout because it would be invoked when switching tabs
      }
    }
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate() {
    // console.log(`Graph componentDidUpdate ${this.props.viewId}`)
  }

  componentWillUnmount() {
    // console.log(`Graph componentWillUnmount ${this.props.viewId}`)
    window.removeEventListener('resize', this.handleResize)
    const { graph } = this.props
    if (graph) {
      graph.unmount()
    }
  }

  handleResize = () => {
    // console.log(`Graph handleResize ${this.props.viewId}`)
    const { graph, doLayout } = this.props
    if (graph) {
      graph.resize()
      graph.fit()
      doLayout()
    }
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
