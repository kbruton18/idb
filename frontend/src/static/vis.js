/* globals d3, fetch */

let carriers = []
let brands = []
let models = []
let os = []
let nodes = []
let links = []

let sim = d3.forceSimulation()
    .force('link', d3.forceLink().id((d) => (d.name)))
    .force('charge', d3.forceManyBody().strength(-500))
    .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))

let svg
let vis
let link
let node
let label
let color = d3.scaleOrdinal(d3.schemeCategory10)

function main () {
  let promises = [fetchCarriers(), fetchBrands(), fetchModels(), fetchOs()]
  Promise.all(promises).then(d3Stuff.bind(null, undefined, undefined))
}

function setupD3 () {
  svg = d3.select('#d3').append('svg').attr('width', window.innerWidth).attr('height', window.innerHeight)
      .call(zoom)
  vis = svg.append('g')
  link = vis.append('g').attr('class', 'links')
  node = vis.append('g').attr('class', 'nodes')
  label = vis.append('g').attr('class', 'labels')
}

function d3Stuff (usedNodes, usedLinks) {
  if (usedNodes === undefined) {
    console.log('defaulting')
    usedNodes = nodes
    usedLinks = links
    setupD3()
  }
  let r = 10
  console.log('setting links')
  link = link.selectAll('line')
      .data(usedLinks, (d) => d.id)
  link.exit().remove()
  link = link.enter().append('line')
        .attr('stroke-width', 1)
        .merge(link)

  console.log('links set')

  console.log('setting nodes')
  node = node.selectAll('circle')
      .data(usedNodes, (d) => d.name)
  node.exit().remove()
  node = node.enter().append('circle')
        .attr('r', r)
        .attr('fill', (d) => color(d['type']))
        .call(d3.drag()
          .on('start', dragStart)
          .on('drag', dragged)
          .on('end', dragEnd))
        .on('click', (d) => console.log(bfstree(d)))
        .merge(node)

  console.log('nodes set')

  console.log('setting labels')
  label = label.selectAll('text')
        .data(usedNodes, (d) => d.name)
  label.exit().remove()
  label = label.enter().append('text')
            .text((d) => d.name)
          .merge(label)
  console.log('nodes set')

  console.log('setting sim')
  sim.nodes(usedNodes).on('tick', tick)

  sim.force('link').links(usedLinks)

  sim.alpha(1).restart()
  console.log('sim set')
  console.log(sim.nodes())

  function tick () {
    node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)

    label
        .attr('x', (d) => d.x + r * 1.5)
        .attr('y', (d) => d.y + r / 2)

    link
        .attr('x1', (d) => d.source.x)
        .attr('x2', (d) => d.target.x)
        .attr('y1', (d) => d.source.y)
        .attr('y2', (d) => d.target.y)
  }
}

function fetchCarriers () {
  return fetch('https://sweet-travels.appspot.com/api/proxy/carriers').then((r) => r.json()).then(processCarriers)
}

function fetchBrands () {
  return fetch('https://sweet-travels.appspot.com/api/proxy/brands').then((r) => r.json()).then(processBrands)
}

function fetchModels () {
  function f () {
    return fetch('https://sweet-travels.appspot.com/api/proxy/models').then((r) => r.json()).then(processModels)
  }

  function r (i) {
    return f().catch(function (e) {
      if (i < 20) {
        return r(i + 1)
      }
      throw e
    })
  }

  return r(0)
}

function fetchOs () {
  return fetch('https://sweet-travels.appspot.com/api/proxy/os').then((r) => r.json()).then(processOs)
}

function zoomed () {
  vis.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ')scale(' + d3.event.transform.k + ')')
}

let zoom = d3.zoom()
  .on('zoom', zoomed)

function dragStart (d) {
  if (!d3.event.active) {
    sim.alphaTarget(0.3).restart()
  }
  d.fx = d.x
  d.fy = d.y
}

function dragged (d) {
  d.fx = d3.event.x
  d.fy = d3.event.y
}

function dragEnd (d) {
  if (!d3.event.active) {
    sim.alphaTarget(0)
  }
  d.fx = null
  d.fy = null
}

function printStuff () {
  console.log(carriers)
  console.log(brands)
  console.log(models)
  console.log(os)
}

function processCarriers (data) {
  carriers = data
  carriers.map(function (d) {
    d['type'] = 1
    return d
  })

  carriers.forEach(function (c) {
    c['brands'].forEach(function (b) {
      links.push({'source': c['name'], 'target': b, 'id': c['name'] + '->' + b})
    })
    c['models'].forEach(function (m) {
      links.push({'source': c['name'], 'target': m, 'id': c['name'] + '->' + m})
    })
  })

  nodes = nodes.concat(carriers)
}

function processBrands (data) {
  brands = data
  brands.map(function (d) {
    d['type'] = 2
    return d
  })

  brands.forEach(function (b) {
    b['os'].forEach(function (o) {
      links.push({'source': b['name'], 'target': o, 'id': b['name'] + '->' + o})
    })
    b['phone_models'].forEach(function (m) {
      links.push({'source': b['name'], 'target': m, 'id': b['name'] + '->' + m})
    })
  })

  nodes = nodes.concat(brands)
}

function processModels (data) {
  models = data
  models.map(function (d) {
    d['type'] = 3
    return d
  })
  nodes = nodes.concat(models)
}

function processOs (data) {
  os = data
  os.map(function (d) {
    d['type'] = 4
    return d
  })

  os.forEach(function (o) {
    o['models'].forEach(function (m) {
      links.push({'source': o['name'], 'target': m, 'id': o['name'] + '->' + m})
    })
  })

  nodes = nodes.concat(os)
}

function bfstree (elem) {
  let foundN = [elem]
  let foundL = []

  function isLinkNode (link, element) {
    return isLinkSource(link, element) || isLinkTarget(link, element)
  }

  function isLinkSource (link, element) {
    return link.source.name === element.name
  }

  function isLinkTarget (link, element) {
    return link.target.name === element.name
  }

  for (let i = 0; i < 1; i++) {
    let iterL = links.filter((link) => (!foundL.includes(link) && foundN.some(isLinkNode.bind(null, link))))
    console.log(iterL.length)
    foundL = foundL.concat(iterL)
    iterL.forEach((link) => {
      if (!foundN.some(isLinkSource.bind(null, link))) {
        foundN.push(link.source)
      }

      if (!foundN.some(isLinkTarget.bind(null, link))) {
        foundN.push(link.target)
      }
    })
  }

  d3Stuff(foundN, foundL)

  return {'nodes': foundN, 'links': foundL}
}

main()
