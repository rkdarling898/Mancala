export class AnimationHandler {
    #idGen = idGenerator()
    #eventQueue = new Map()

    addEvent (eventObj) {
        // Code to validate event obj here

        this.#eventQueue.set(this.#idGen.next().value, eventObj)
    }

    finishEvent (eventId) {
        const eventDequeued = this.#eventQueue.delete(eventId)

        if (!eventDequeued) console.error(`Event ID #${eventId} was not found.`)
    }

    runEvents () {
        
    }
}

function* idGenerator () {
    let i = 0

    while (true) yield i++
}