export const Block = head => {
    let _head = head || '', _children = [];

    const getHead = () => _head;
    const getType = () => _head[0];
    const getArgs = () => _head.slice(1);

    const children = (type = null) =>
        type ?
            _children.filter(child => child.type() === type)
        :
            _children.slice(0);
    const firstChild = (type = null) => children(type).at(0);
    const lastChild = (type = null) => children(type).at(-1);

    const setHead = head => _head = head;
    const setChildren = children => _children = children;

    const addChild = child => _children.push(child);
    
    const headAsString = () => _head.join('  ');
    const childrenAsString = () => children().map(child => child.toString()).join('\n');

    const toLines = (delim = '  ') => {
        const lines = [headAsString()]

        children().forEach(child => {
            lines.push(
                ...child
                .toLines()
                .map(line => line ? `${delim}${line}` : line)
            )
        })
        return lines
    }

    const toString = () => toLines().join('\n');

    const toJSON = toObject = () => ({
        head: getHead(),
        children: children().length ? children() : undefined
    });

    return {
        getHead,
        getType,
        getArgs,
        children,
        firstChild,
        lastChild,
        setHead,
        setChildren,
        addChild,
        headAsString,
        childrenAsString,
        toLines,
        toString,
        toJSON
    };
};

export const fromObject = json => {
    let _block = Block(json.head);
    _block.setChildren((json.children || []).map(child => fromObject(child)));
    return _block;
};