import Timer from "./Timer.js"
import Block from "./Block.js"

/*
[0, 0] [0, 1] [0, 2]
[1, 0] [1, 1] [1, 2]
[2, 0] [2, 1] [2, 2]
*/

// 게임판 생성
const createBoard = () => {
  const BOARD = new Array(3)
  for (let i = 0; i < 3; i++) {
    BOARD[i] = new Array(3)
  }
  return BOARD
}
const BOARD = createBoard()

// 타이머 객체
const timer = new Timer()

// 게임판에 블록 할당
const blockList = []
const createBlock = () => {
  let count = 1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (count !== 9) {
        BOARD[i][j] = new Block(i, j, count++, timer)
        BOARD[i][j].render(BOARD)
        blockList.push(BOARD[i][j])
      } else {
        BOARD[i][j] = null
      }
    }
  }
}
createBlock()

// 게임판 섞기
const mixPosition = () => {
  const blocks = document.getElementsByClassName("block")
  const intervalId = setInterval(() => {
    const index = Math.floor(Math.random() * 8)
    blocks[index].click()
  }, 1)
  setTimeout(() => {
    clearInterval(intervalId)
    timer.start()
    for (const block of blockList) {
      block.GAMESTARTED = true
    }
  }, 5000)
}

// 게임 시작 버튼
const startButton = document.getElementById("start")
startButton.addEventListener("click", () => {
  mixPosition()
  startButton.disabled = true
  startButton.innerHTML = "Mixing..."  
  startButton.classList.add("disabled")
  timer.reset()
  setTimeout(() => {
    startButton.innerHTML = "Ticking!"
  }, 5000)
})

