export function getScaledPosition (coordinates, scale) {
    return {x: coordinates.x * scale, y: coordinates.y * scale}
}

export function getBoundClickHandler (handlerFn, ...handlerArgs) {
    return handlerFn.bind(null, ...handlerArgs)
}