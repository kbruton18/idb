let carriers = []
let brands = []
let models = []
let os = []

function main () {
  let cp = fetch('https://sweet-travels.appspot.com/api/proxy/carriers').then((r) => r.json()).then(processCarriers)
  let bp = fetch('https://sweet-travels.appspot.com/api/proxy/brands').then((r) => r.json()).then(processBrands)
  let mp = fetch('https://sweet-travels.appspot.com/api/proxy/models').then((r) => r.json()).then(processModels)
  let op = fetch('https://sweet-travels.appspot.com/api/proxy/os').then((r) => r.json()).then(processOs)
  let promises = [cp, bp, mp, op]
  Promise.all(promises).then(printStuff).catch(printStuff)
}

function d3Stuff () {
    let svg = d3.select('#d3').append('svg').attr('width', window.innerWidth).attr('height', window.innerHeigth)

    let sim = d3.forceSimulation()
        .force('link', d3.forceLink().id((d) => (d.name)))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
}

function printStuff () {
  console.log(carriers)
  console.log(brands)
  console.log(models)
  console.log(os)
}

function printBadStuff (promises) {
  console.log(promises)
}

function processCarriers (data) {
  carriers = data
}

function processBrands (data) {
  brands = data
}

function processModels (data) {
  models = data
}

function processOs (data) {
  os = data
}

main()
