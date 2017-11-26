/* globals d3, fetch */

let carriers = []
let brands = []
let models = []
let os = []
let all = []

let sim = d3.forceSimulation()
    .force('link', d3.forceLink().id((d) => (d.name)))
    .force('charge', d3.forceManyBody().strength(-5))
    .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))

let color = d3.scaleOrdinal(d3.schemeCategory10)

function main () {
  let cp = fetch('https://sweet-travels.appspot.com/api/proxy/carriers').then((r) => r.json()).then(processCarriers)
  let bp = fetch('https://sweet-travels.appspot.com/api/proxy/brands').then((r) => r.json()).then(processBrands)
//  let mp = fetch('https://sweet-travels.appspot.com/api/proxy/models').then((r) => r.json()).then(processModels)
  let op = fetch('https://sweet-travels.appspot.com/api/proxy/os').then((r) => r.json()).then(processOs)
//  let promises = [cp, bp, mp, op]
  let promises = [cp, bp, op]
  Promise.all(promises).then(printStuff).then(d3Stuff)
}

function d3Stuff () {
  let svg = d3.select('#d3').append('svg').attr('width', window.innerWidth).attr('height', window.innerHeight)
  let node = svg.append('g').attr('class', 'nodes')
  let link = svg.append('g').attr('class', 'links')

  node = node.selectAll('circle')
      .data(all)
      .enter().append('circle')
        .attr('r', 10)
        .attr('fill', (d) => color(d['type']))
        .call(d3.drag()
          .on('start', dragStart)
          .on('drag', dragged)
          .on('end', dragEnd))

  sim.nodes(all).on('tick', tick)
  console.log(sim.nodes())
  sim.alpha(1).restart()

  function tick () {
    node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
  }
}

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
  all = all.concat(carriers)
}

function processBrands (data) {
  brands = data
  brands.map(function (d) {
    d['type'] = 2
    return d
  })
  all = all.concat(brands)
}

function processModels (data) {
  models = data
  models.map(function (d) {
    d['type'] = 3
    return d
  })
}

function processOs (data) {
  os = data
  os.map(function (d) {
    d['type'] = 4
    return d
  })
}

main()
