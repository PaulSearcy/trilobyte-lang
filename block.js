export class Block {
  constructor(head) {
    this._head = head
    this._children = []
  }

  head() {
    return this._head
  }

  type() {
    return this._head[0]
  }

  args() {
    return this._head.slice(1)
  }

  firstChild(type = null) {
    return this.children(type).at(0)
  }

  lastChild(type = null) {
    return this.children(type).at(-1)
  }

  children(type = null) {
    if (type) return this._children.filter(child => child.type() === type)
    else return this._children.slice(0)
  }

  setHead(head) {
    this._head = head
  }

  setChildren(children) {
    this._children = children
  }

  addChild(child) {
    this._children.push(child)
  }

  headAsString() {
    return this._head.join(' ')
  }

  childrenAsString() {
    return this.children().map(child => child.toString()).join('\n')
  }

  toLines(delim = '  ') {
    const lines = [this.headAsString()]

    this.children().forEach(child => {
      lines.push(
        ...child
        .toLines()
        .map(line => line ? `${delim}${line}` : line)
      )
    })
    return lines
  }

  toString(delim = '  ') {
    return this.toLines().join('\n')
  }

  toObject() {
    return { head: this.head(), children: this.children().length ? this.children() : undefined }
  }

  static fromObject(json) {
    const block = new Block()
    block.setHead(json.head)
    block.setChildren((json.children || []).map(child => Block.fromObject(child)))
    return block
  }

  toJSON() {
    return this.toObject()
  }
}
