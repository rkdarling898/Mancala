export function avalancheLogic (pit, board) {
    const nextPit = board.nextPit(pit.id)

    moveStone(pit, nextPit)
}

export function moveStone (currentPit, nextPit) {
    const stone = currentPit.stones.pop()

    if (stone !== undefined) {
        const nextPitPosition = nextPit.position

        stone.x = nextPitPosition.x
        stone.y = nextPitPosition.y

        nextPit.stones.push(stone)
    }
}

// Shannon is the most beautiful person in the world