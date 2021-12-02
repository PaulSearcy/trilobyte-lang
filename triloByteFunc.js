import { Block } from './blockFunc.js'

export const parse = (string, delim = '  ') => {
    const root = Block(['root'])
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

      line === '' ?
        line = []
      :
        line = line.slice(depth * delim.length).split(' ')

      prevDepth = depth
      return [depth, line]
    })
    const activeBlocks = new Array(maxDepth)

    linesWithDepths.forEach(([depth, line]) => {
      const block = Block(line)
      activeBlocks[depth] = block

      depth === 0 ?
        root.addChild(block)
      : 
        activeBlocks[depth - 1].addChild(block);
    })

    return root
}
