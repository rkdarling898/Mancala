export function getScale (canvas) {
    // Designed for use as widget, will need parent div
    // Aim for 16:9 aspect ratio. Will leave margin if not in ratio

    const container = canvas.parentNode
    const calcScale = (longSide, shortSide) => {
        if (longSide < 320) return 1

        let scale = Math.floor(longSide/80) / 4

        // Return scale that keeps canvas fully in view
        return (scale * 180 > shortSide) ? Math.floor(shortSide/36) / 5 : scale
    }

    if (container.clientWidth < container.clientHeight) {
        canvas.classList.toggle('rotated', true)
        return calcScale(container.clientHeight, container.clientWidth)
    }

    canvas.classList.toggle('rotated', false)
    return calcScale(container.clientWidth, container.clientHeight)
}

export function scaleCanvas (canvas, scale) {
    canvas.width = 320 * scale
    canvas.height = 180 * scale
}