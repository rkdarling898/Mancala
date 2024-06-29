export function getScaledPosition (coordinates, scale) {
    return {x: coordinates.x * scale, y: coordinates.y * scale}
}

export function getBoundClickHandler (handlerFn, ...handlerArgs) {
    return handlerFn.bind(null, ...handlerArgs)
}

export function isFunction(fn) {
    return Object.prototype.toString.call(fn) == '[object Function]';
  }