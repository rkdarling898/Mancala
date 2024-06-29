export function deltaClosure () {
    let lastTime = 0

    function getDelta () {
        if (lastTime === 0) {
            lastTime = Date.now()
            return 0
        }

        let currentTime = Date.now()
        let delta = currentTime - lastTime

        lastTime = currentTime

        return delta
    }
    
    return getDelta
}

export function getScaledPosition (coordinates, scale) {
    return {x: coordinates.x * scale, y: coordinates.y * scale}
}

export function getBoundClickHandler (handlerFn, ...handlerArgs) {
    return handlerFn.bind(null, ...handlerArgs)
}

export function isFunction(fn) {
    return Object.prototype.toString.call(fn) == '[object Function]';
  }