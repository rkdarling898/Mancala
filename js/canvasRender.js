// function draw (ctx, drawingFn,...args) {
//     ctx.beginPath()

//     drawingFn(ctx, ...args)

//     ctx.closePath()
// }

export function drawCircle (ctx, x, y, radius, fillBool = false) {
    ctx.beginPath()
    
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()

    if (fillBool) ctx.fill()

    ctx.closePath()
}

export function drawEllipse (ctx, x, y, radiusX, radiusY, fillBool = false) {
    ctx.beginPath()
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
    ctx.stroke()

    if (fillBool) ctx.fill()

    ctx.closePath()
}

export function drawRoundRect (ctx, x, y, width, height, radii, fillBool = false) {
    ctx.beginPath()
    ctx.roundRect(x, y, width, height, radii)
    ctx.stroke()

    if (fillBool) ctx.fill()

    ctx.closePath()
}