export function avalancheLogic (pit, board, state) {
    if (
        state.gamePlayPaused ||
        pit.type === 'store' ||
        !isCurrentPlayerPit(pit.id, state.isPlayer1Turn) ||
        pit.stones.length === 0
       ) return

    const storeIdToSkip = state.isPlayer1Turn ? 14 : 7
    
    spreadStonesLoop(pit, board, state, storeIdToSkip)

    if (gameIsOver(board)) {
        state.gamePlayPaused = true
        alert("It's all over folks")
    }
}

function isCurrentPlayerPit (pitId, isPlayer1Turn) {
    return isPlayer1Turn ? (pitId <= 7) : (pitId > 7)
}

function gameIsOver (board) {
    if (board.p1PitsEmpty()) return true
// Also move all remaining stones to correct player
    if (board.p2PitsEmpty()) return true

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

function moveStone (currentPit, nextPit) {
    const stone = currentPit.stones.pop()

    if (stone !== undefined) {
        const nextPitPosition = nextPit.position

        stone.x = nextPitPosition.x
        stone.y = nextPitPosition.y

        nextPit.stones.push(stone)
    }
}

function spreadStonesInPit (pit, board, storeIdToSkip) {
    const stoneCount = pit.stones.length
    let idToPass = pit.id

    for (let i = 0; i < stoneCount; i++) {
        let recievingPit = board.nextPit(idToPass)

        if (recievingPit.id === storeIdToSkip) recievingPit = board.nextPit(recievingPit.id)

        moveStone(pit, recievingPit)

        idToPass = recievingPit.id
    }
}

function spreadStonesLoop (pit, board, state, storeIdToSkip) {
    const playerStoreId = storeIdToSkip === 14 ? 7 : 14

    let continueLooping = true
    let currentPit = pit
    let lastPitInPath = getLastPitInPath(pit, board, storeIdToSkip)

    while (continueLooping) {
        if (lastPitInPath.stones.length === 0 || lastPitInPath.id === playerStoreId) continueLooping = false

        spreadStonesInPit(currentPit, board, storeIdToSkip)
        
        if (continueLooping) {
            currentPit = lastPitInPath
            lastPitInPath = getLastPitInPath(currentPit, board, storeIdToSkip)
        }
    }

    if (lastPitInPath.type === 'pit') {
        state.isPlayer1Turn = state.isPlayer1Turn ? false : true
    }

    console.log(lastPitInPath)
}

// Shannon is the most beautiful person in the world