import { Block } from './block.js'

class Trilobyte {
  static parse(string, delim = '  ') {
    const lines = string.split('\n')

    let maxDepth = 0
    let prevDepth = 0

    const linesWithDepths = lines.map(line => {
      let depth = 0
      while (true) {
        if (line === '') {
          depth = prevDepth
          break
        }
        if (line.indexOf(delim, depth * delim.length) === depth * delim.length) {
          depth++
        } else {
          if (depth > maxDepth) maxDepth = depth
          break
        }
      }

      if (line === '') line = []
      else line = line.slice(depth * delim.length).split(' ')

      prevDepth = depth
      return [depth, line]
    })

    const root = new Block(['root'])
    const activeBlocks = new Array(maxDepth)

    linesWithDepths.forEach(([depth, line]) => {
      const block = new Block(line)
      activeBlocks[depth] = block

      if (depth === 0) root.addChild(block)
      else activeBlocks[depth - 1].addChild(block)
    })

    return root
  }

  static stringify(root, delim = '  ') {
    return root.children().map(block => block.toString(delim)).join('\n')
  }
}

export { Block, Trilobyte }
