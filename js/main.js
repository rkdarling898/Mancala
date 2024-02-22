import { Canvas } from "./canvas.js";
import { MancalaRenderer } from "./mancalarenderer.js";

const canvas = new Canvas(document.getElementById("game-canvas"))
const mRend = new MancalaRenderer(canvas)

canvas.size = getCanvasSize()

mRend.render()

function getCanvasSize () {
    if (innerWidth >= 800) return {width: 800, height: 600}

    const width = innerWidth > 375 ? innerWidth : 375
    const height = width * 0.75

    return {width, height}
}