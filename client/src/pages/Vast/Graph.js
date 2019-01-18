import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import vis from 'vis'

class Vast extends PureComponent {
  static propTypes = {
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired
      })
    ).isRequired
  }

  constructor(props) {
    super(props)
    this.vis = null
    this.network = null
  }

  componentDidMount() {
    const { nodes, edges } = this.props
    const data = {
      nodes: new vis.DataSet(nodes.asMutable({ deep: true })),
      edges: new vis.DataSet(edges.asMutable({ deep: true }))
    }
    const options = {
      autoResize: true,
      height: '100%',
      width: '100%'
    }

    this.network = new vis.Network(this.vis, data, options)
  }

  render() {
    return (
      <div
        style={{ height: '100vh' }}
        ref={ref => {
          this.vis = ref
        }}
      />
    )
  }
}

export default Vast
