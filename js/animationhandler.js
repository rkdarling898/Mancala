export class AnimationHandler {
    #eventQueue = []
    #lastRenderTime

    constructor () {
        this.runEventLoop = true
        this.eventLoop = eventLoop.bind(this)
    }

    addEvent (eventObj) {
        // Code to validate event obj here

        this.#eventQueue.push(eventObj)
    }

    async runEvent (event, renderFunc, params) {

    }

    async runEvents (renderFunc, params = []) {
        if (typeof(renderFunc) !== 'function') {
            console.log('Render function paramater was not of type function. Please pass function here.')
            return
        }

        if (this.queueLength === 0) {
            console.log('No events to run in queue')
            return
        }

        // Figure out how to use Promise.allSettled in order to run all animations together

        this.eventLoop()

        await Promise.allSettled(this.#eventQueue.map(event => this.runEvent(event, renderFunc, params)))

        this.runEventLoop = false
    }

    get queueLength () {
        return this.#eventQueue.length
    }
}

async function eventLoop () {
    if (this.runEventLoop) {
        requestAnimationFrame(this.eventLoop)
    } else {
        console.log('stopped')
        this.runEventLoop = true
    }
}