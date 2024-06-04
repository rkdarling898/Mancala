import { getScale } from "./canvasScaling.js"
import { getBoundClickHandler, getScaledPosition } from "./utils.js"

export function gameClickHandler (board, canvas) {
    const canvasEl = canvas

    function handler (board, e) {
        const scale = getScale(canvasEl)
        const clickPosition = {x: e.offsetX, y: e.offsetY}
        const radius = board.getMeasurements(scale).pitRadius

        console.log(clickedPit(scale, radius, board.pits, clickPosition))
    }

    return getBoundClickHandler(handler, board)
}

function clickedPit (scale, radius, pits, clickPosition) {
    for (let i = 0; i < pits.length; i++) {
        if (isInRadius(radius, getScaledPosition(pits[i].position, scale), clickPosition)) return pits[i]
    }

    return null
}

function isInRadius (radius, position1, position2) {
    const dX = position2.x - position1.x
    const dY = position2.y - position1.y

    return (Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)) < radius)
}