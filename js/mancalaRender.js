import { drawCircle, drawEllipse, drawRoundRect } from "./canvasRender.js"

export function renderBoard (ctx, board, scale) {
    const bDims = board.getMeasurements(scale)

    ctx.strokeStyle = 'black'

    drawRoundRect(ctx, bDims.x, bDims.y, bDims.width, bDims.height, [3 * scale])
    renderPits(ctx, bDims.pitRadius, board.pits, scale)
}

function renderPits (ctx, radius, pitArray, scale) {
    pitArray.forEach(pit => {
        let {x, y} = getScaledPosition(pit.position, scale)

        pit.type === 'store' ? drawEllipse(ctx, x, y, radius, 33 * scale) : drawCircle(ctx, x, y, radius)
    })
}

function getScaledPosition (coordinates, scale) {
    return {x: coordinates.x * scale, y: coordinates.y * scale}
}