import { Canvas } from "./canvas.js";
import { MancalaRenderer } from "./mancalarenderer.js";

const canvas = new Canvas(document.getElementById("game-canvas"))
const mRend = new MancalaRenderer(canvas)

canvas.size = getCanvasSize()

mRend.render()

function getCanvasSize () {
    if (innerWidth >= 1000) return {width: 1000, height: 500}

    const width = innerWidth > 350 ? innerWidth : 350
    const height = width * 0.5

    return {width, height}
}