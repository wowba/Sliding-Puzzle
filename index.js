import Timer from "./Timer.js"

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

/*
[0, 0] [0, 1] [0, 2]
[1, 0] [1, 1] [1, 2]
[2, 0] [2, 1] [2, 2]
*/
let GAMESTARTED = false

// 게임판 생성
const createBoard = () => {
  const board = new Array(3)
  for (let i = 0; i < 3; i++) {
    board[i] = new Array(3)
  }
  return board
}
const board = createBoard()

// 타이머 객체
const timer = new Timer()

// Block 객체
class Block {
  constructor (x, y, number) {
    this.x = x
    this.y = y
    this.number = number
  }

  shake() {
    const blockDiv = document.getElementById(this.number)
    blockDiv.classList.add("shake")
    setTimeout(() => {
      blockDiv.classList.remove("shake")
    }, 1000)
  }

  move() {
    const blockDiv = document.getElementById(this.number)
    blockDiv.style.top = (this.x + 0.2) * 100 + "px"
    blockDiv.style.left = (-150 + (this.y * 100)) + "px"
  }

  async checkAnswer() {
    let isAnswer = true
    let number = 1
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (number === 9) {
          break
        }

        if (board[i][j] === null || board[i][j].number !== number++) {
          isAnswer = false
          break
        }
      }
      if (!isAnswer) break
    }
    
    if (isAnswer) {
      setTimeout(() => {
        timer.stop()
        GAMESTARTED = false
        startButton.disabled = false
        startButton.classList.remove("disabled")
        startButton.innerText = "Start"
      }, 1000)
      await sleep(1)
      const blocks = document.getElementsByClassName("block")
      for (const block of blocks) {
        setTimeout(() => {
          block.classList.add("success")
        }, 200)
        setTimeout(() => {
          block.classList.remove("success")
        }, 1200)
        await sleep(0.05)
      }
    }
  }

  click() {
    // 주변 블럭을 확인하여 빈 칸이 있을 경우 이동
    // 없을 경우 흔들리는 효과
    const dx = [1, -1, 0, 0]
    const dy = [0, 0, 1, -1]
    let isMoved = false
    for (let i = 0; i < 4; i++) {
      let nx = this.x + dx[i]
      let ny = this.y + dy[i]
      if (nx < 0 || nx > 2 || ny < 0 || ny > 2) {
        continue
      } else {
        if (board[nx][ny] === null) {
          board[nx][ny] = board[this.x][this.y]
          board[this.x][this.y] = null
          this.x = nx
          this.y = ny
          this.move()
          isMoved = true
          break
        }
      }
    }
    if (!isMoved) this.shake()
    if (GAMESTARTED) this.checkAnswer()
  }

  render() {
    const blockDiv = document.createElement("div")
    blockDiv.id = this.number
    blockDiv.classList.add("block")
    blockDiv.innerText = this.number
    blockDiv.addEventListener("click", () => {
      this.click()
    })

    const boardDiv = document.getElementById("board")
    boardDiv.append(blockDiv)
    this.move()
  }
}

// 게임판에 블록 할당
const createBlock = () => {
  let count = 1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (count !== 9) {
        board[i][j] = new Block(i, j, count++)
        board[i][j].render()
      } else {
        board[i][j] = null
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
    GAMESTARTED = true
    timer.start()
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

