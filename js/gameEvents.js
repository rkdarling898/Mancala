import { AsyncEventQueue } from "./asyncEventQueue.js"

export async function avalancheLogic (pit, board, state) {
    if (
        state.gamePlayPaused ||
        pit.type === 'store' ||
        !isCurrentPlayerPit(pit.id, state.isPlayer1Turn) ||
        pit.stones.length === 0
       ) return

    const storeIdToSkip = state.isPlayer1Turn ? 14 : 7
    
    state.gamePlayPaused = true

    await spreadStonesLoop(pit, board, state, storeIdToSkip)

    if (gameIsOver(board)) {
        alert("It's all over folks")
        return
    }

    state.gamePlayPaused = false
}

function createStoneMoveEvent (stone, currentPit, nextPit, moveTime) {
    async function stoneEvent () {
        await new Promise(resolve => {
            const deltaX = nextPit.x - currentPit.x
            const deltaY = nextPit.y - currentPit.y

            stone.velocity = {
                x: deltaX / moveTime,
                y: deltaY / moveTime
            }
            
            setTimeout(() => {
                resolve()
            }, moveTime)
        })

        stone.velocity = {x: 0, y: 0}
        stone.x = nextPit.x
        stone.y = nextPit.y
    }

    return stoneEvent
}

function createStoneEventQueue (stone, pit, pitsInPath) {
    const eventQueue = new AsyncEventQueue()

    for (let i = 0; i < pitsInPath.length; i++) {
        eventQueue.enqueue(createStoneMoveEvent(stone, pit, pitsInPath[i], 2000))
    }

    return eventQueue
}

function isCurrentPlayerPit (pitId, isPlayer1Turn) {
    return isPlayer1Turn ? (pitId <= 7) : (pitId > 7)
}

function gameIsOver (board) {
    if (board.p1PitsEmpty() || board.p2PitsEmpty()) return true
// Also move all remaining stones to correct player

    return false
}

function getLastPitInPath (pit, board, storeIdToSkip) {
    let currentPit = pit

    for (let i = 0; i < pit.stones.length; i++) {
        let nextPit = board.nextPit(currentPit.id)

        if (nextPit.id === storeIdToSkip) nextPit = board.nextPit(nextPit.id)

        currentPit = nextPit
    }

    return currentPit
}

function getPitsInSpreadPath (currentPit, board, storeIdToSkip) {
    const pitsInPath = []
    let idToPass = currentPit.id
    let nextPit

    for (let i = 0; i < currentPit.stones.length; i++) {
        nextPit = board.nextPit(idToPass)

        if (nextPit.id === storeIdToSkip) nextPit = board.nextPit(nextPit.id)

        pitsInPath.push(nextPit)

        idToPass = nextPit.id
    }

    return pitsInPath
}

// function moveStone (currentPit, nextPit) {
//     const stone = currentPit.stones.pop()

//     if (stone !== undefined) {
//         const nextPitPosition = nextPit.position

//         stone.x = nextPitPosition.x
//         stone.y = nextPitPosition.y

//         nextPit.stones.push(stone)
//     }
// }

async function spreadStonesIntoPits (pit, board, storeIdToSkip) {
    const stoneCount = pit.stones.length
    const pitsInPath = getPitsInSpreadPath(pit, board, storeIdToSkip)
    const stoneEventQueues = []

    for (let i = 0; i < stoneCount; i++) {
        const stone = pit.stones.pop()
        const lastPit = pitsInPath[pitsInPath.length - 1]
        
        stoneEventQueues.push(createStoneEventQueue(stone, pit, pitsInPath))

        lastPit.stones.push(stone)

        pitsInPath.pop()
    }

    await Promise.race(stoneEventQueues.map(queue => queue.runAllEvents()))
}

async function spreadStonesLoop (pit, board, state, storeIdToSkip) {
    const playerStoreId = storeIdToSkip === 14 ? 7 : 14

    let continueLooping = true
    let currentPit = pit
    let lastPitInPath = getLastPitInPath(pit, board, storeIdToSkip)

    while (continueLooping) {
        if (lastPitInPath.stones.length === 0 || lastPitInPath.id === playerStoreId) continueLooping = false

        await spreadStonesIntoPits(currentPit, board, storeIdToSkip)
        
        if (continueLooping) {
            currentPit = lastPitInPath
            lastPitInPath = getLastPitInPath(currentPit, board, storeIdToSkip)
        }
    }

    if (lastPitInPath.type === 'pit') {
        state.isPlayer1Turn = state.isPlayer1Turn ? false : true
    }
}

// Shannon is the most beautiful person in the world