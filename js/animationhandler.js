export class AnimationHandler {
    #idGen = idGenerator()
    #eventQueue = new Map()
    #lastRenderTime

    constructor () {

    }

    addEvent (eventObj) {
        // Code to validate event obj here

        this.#eventQueue.set(this.#idGen.next().value, eventObj)
    }

    finishEvent (eventId) {
        const eventDequeued = this.#eventQueue.delete(eventId)

        if (!eventDequeued) console.error(`Event ID #${eventId} was not found.`)
    }

    async runEvent (renderFunc, params) {

    }

    runEvents (renderFunc, params = []) {
        if (typeof(renderFunc) !== 'function') {
            console.log('Render function paramater was not of type function. Please pass function here.')
            return
        }

        if (this.queueLength === 0) {
            console.log('No events to run in queue')
            return
        }

        // Figure out how to use Promise.allSettled in order to run all animations together
    }

    get queueLength () {
        return this.#eventQueue.size
    }
}

function* idGenerator () {
    let i = 0

    while (true) yield i++
}