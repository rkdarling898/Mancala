export class AsyncEventQueue {
    #head = null
    #tail = null
    #length = 0

    enqueue (promiseFn) {
        const node = new AsyncEventNode(promiseFn, null)

        if (this.#tail === null) {
            this.#head = node
            this.#tail = node
        } else {
            this.#tail.next = node
            this.#tail = this.#tail.next
        }

        this.#length++

        return this.#tail
    }

    dequeue () {
        if (this.#head === null && this.#tail === null) return null

        const headNode = this.#head

        if (this.#head.next === null) {
            this.#head = null
            this.#tail = null
        } else {
            this.#head = this.#head.next
        }

        this.#length--
        
        return headNode
    }

    async runEvent () {
        if (this.#head === null) return null

        await this.#head.event()

        this.dequeue()
    }

    async runAllEvents () {
        if (this.#head === null) return

        const eventCount = this.#length

        for (let i = 0; i < eventCount; i++) {
            await this.runEvent()
        }
    }

    get head () {
        return this.#head
    }

    get tail () {
        return this.#tail
    }

    get length () {
        return this.#length
    }
}

class AsyncEventNode {
    constructor (promiseFn, nextNode) {
        this.event = promiseFn
        this.next = nextNode
    }
}