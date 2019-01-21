import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  graphSelector,
  graphStyleSelector,
  graphLayoutSelector
} from 'reduxStore/vast/vastSelectors'

class Graph extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    graph: PropTypes.object.isRequired,
    style: PropTypes.arrayOf(
      PropTypes.shape({
        selector: PropTypes.string.isRequired,
        style: PropTypes.object.isRequired
      })
    ).isRequired,
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
      this.handleStyleChange()
    }
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate(prevProps) {
    const { style } = this.props

    // Apply updated style?
    if (prevProps.style !== style) {
      this.handleStyleChange()
    }
  }

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

  handleStyleChange = () => {
    const { graph, style } = this.props
    graph
      .style()
      .fromJson(style)
      .update()
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
    style: graphStyleSelector(state),
    layout: graphLayoutSelector(state)
  }),
  dispatch => ({})
)(Graph)
