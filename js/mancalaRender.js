import { drawCircle, drawEllipse, drawRoundRect } from "./canvasRender.js"
import { getScaledPosition } from "./utils.js"

export function renderBoard (ctx, board, scale) {
    const bDims = board.getMeasurements(scale)

    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'red'

    drawRoundRect(ctx, bDims.x, bDims.y, bDims.width, bDims.height, [3 * scale])

    renderPits(ctx, bDims.pitRadius, board.pits, scale)
    renderStones(ctx, 4 * scale, board.pits, scale)
}

function renderPits (ctx, radius, pitArray, scale) {
    pitArray.forEach(pit => {
        let {x, y} = getScaledPosition(pit.position, scale)

        pit.type === 'store' ? drawEllipse(ctx, x, y, radius, 33 * scale) : drawCircle(ctx, x, y, radius)
    })
}

function renderStones (ctx, radius, pitArray, scale) {
    pitArray.forEach(pit => {
        renderStonesInPit(ctx, radius, pit, scale)
    })
}

function renderStonesInPit (ctx, radius, pit, scale) {
    pit.stones.forEach(stone => {
        const {x, y} = getScaledPosition(stone.position, scale)
        let offset = stone.offset

        drawCircle(ctx, x + (offset.x * scale), y + (offset.y * scale), radius, true)
    })
}

export function update (board, delta, scale) {
    board.pits.forEach(pit => {
        pit.stones.forEach(stone => {
            stone.x += stone.velocity.x * delta * scale
            stone.y += stone.velocity.y * delta * scale
        })
    })
}