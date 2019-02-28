const resultLayout = (cy, Result) => {
  const layoutDelay = (layout, options) => {
    const self = this
    const container = cy.container()

    if (self.cyLayout) {
      cy.elements().stop(true) // because https://github.com/cytoscape/cytoscape.js/issues/983

      self.cyLayout.stop()
      self.cyLayout = null
    }

    setTimeout(() => {
      self.cyLayout = layout

      if (self.networksExpanded && options.resizeCy) {
        container.classList.add('cy-layouting-shift')
      }

      if (self.query.historyExpanded && options.resizeCy) {
        container.classList.add('cy-layouting-shift-history')
      }

      layout.run()
    }, 0)
  }

  const layoutPrepost = (layout, options) => {
    const self = this
    const container = cy.container()

    const opts = options || {}

    if (!Result.prelayoutPosns && !opts.undo) {
      self.prelayoutPosns = {}
      const posns = self.prelayoutPosns
      const nodes = cy.nodes()

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        const p = node.position()

        posns[node.id()] = { x: p.x, y: p.y }
      }

      self.layoutUndone = false
    }

    if (self.layoutPromise) {
      self.layoutPromise.cancel()
    }

    cy.nodes().removeClass('with-descr')

    const p = new Promise(resolve => {
      layout.one('layoutstop', () => {
        resolve()
      })
    })
      .then(() => {
        const cl = container.classList

        if (opts.resizeCy) {
          cl.remove('cy-layouting-shift')
          cl.remove('cy-layouting-shift-history')
        }
      })
      .cancellable()

    self.layoutPromise = p
    return p
  }

  const layout = options => {
    const defaultDuration = 750
    const defaultPadding = 50
    const defaultEasing = 'spring(500, 37)'

    const opts = {
      fit: true,
      randomize: true,
      animate: true,
      nodeSpacing: 15,
      lengthFactor: 100,
      maxSimulationTime: 2000,
      padding: defaultPadding,
      resizeCy: true,
      ...options
    }

    const layoutEles = cy
      .elements()
      .stdFilter(ele => ele.isNode() || !ele.hasClass('filtered'))

    let avgW = 0
    let minW = Infinity
    let maxW = -Infinity

    const layoutEdges = layoutEles.edges()

    for (let i = 0; i < layoutEdges.length; i += 1) {
      const ele = layoutEdges[i]
      const w = ele.data('weight')

      avgW += w

      minW = Math.min(w, minW)
      maxW = Math.max(w, maxW)
    }

    avgW /= layoutEdges.length

    const norm = w => ((w - minW) / (maxW - minW)) * 9 + 1 // ranges on (1, 10)

    for (let i = 0; i < layoutEdges.length; i += 1) {
      const ele = layoutEdges[i]
      const w = ele.data('weight')

      ele.data('normWeight', norm(w))
    }

    const avgWNorm = norm(avgW)
    const minLength = 0
    const maxLength = 150

    const edgeLength = e => {
      const length = () => {
        let w = e.data('weight')

        if (w == null) {
          w = avgW
        }

        // as w => inf, l => 0
        const l = opts.lengthFactor / w

        return l
      }

      let l = length(e)

      if (e.data('group') === 'coexp') {
        l *= 10
      }

      if (l < minLength) {
        return minLength
      }
      if (l > maxLength) {
        return maxLength
      }
      return l
    }

    const layoutNodes = layoutEles.nodes()

    for (let i = 0; i < layoutNodes.length; i += 1) {
      const node = layoutNodes[i]
      const pos = node.position()

      node.data('preForcePos', {
        x: pos.x,
        y: pos.y
      })
    }

    const l = layoutEles.makeLayout({
      name: 'cose',
      nodeOverlap: 30,
      fit: opts.fit,
      animate: false,
      randomize: opts.randomize,
      maxSimulationTime: opts.maxSimulationTime,
      idealEdgeLength: edgeLength,
      padding: defaultPadding
    })

    const p = layoutPrepost(l, opts)

    layoutDelay(l, opts)

    if (opts.animate) {
      return p.then(() => {
        const id2pos = {}

        for (let i = 0; i < layoutNodes.length; i += 1) {
          const node = layoutNodes[i]
          const pos1 = node.data('preForcePos')
          const pos = node.position()
          const pos2 = { x: pos.x, y: pos.y }

          node.position(pos1)

          id2pos[node.id()] = pos2
        }

        const presetLayout = layoutNodes.makeLayout({
          name: 'preset',
          positions: id2pos,
          fit: opts.fit,
          animate: true,
          animationEasing: defaultEasing,
          animationDuration: defaultDuration,
          padding: defaultPadding
        })

        layoutDelay(presetLayout, opts)

        return presetLayout.promiseOn('layoutstop')
      })
    }
    return p
  }
}

export default resultLayout
