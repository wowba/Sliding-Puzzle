const startButton = document.getElementById("start")

class Block {
  constructor (x, y, number, timer) {
    this.x = x
    this.y = y
    this.number = number
    this.timer = timer
    this.GAMESTARTED = false
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

  async checkAnswer(BOARD) {
    let isAnswer = true
    let number = 1
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (number === 9) {
          break
        }
        if (BOARD[i][j] === null || BOARD[i][j].number !== number++) {
          isAnswer = false
          break
        }
      }
      if (!isAnswer) break
    }
    if (isAnswer) {
      setTimeout(() => {
        this.timer.stop()
        let count = 1
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (count !== 9) {
              BOARD[i][j].GAMESTARTED = false
              count++
            }
          }
        }
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

  click(BOARD) {
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
        if (BOARD[nx][ny] === null) {
          BOARD[nx][ny] = BOARD[this.x][this.y]
          BOARD[this.x][this.y] = null
          this.x = nx
          this.y = ny
          this.move()
          isMoved = true
          break
        }z
      }
    }
    if (!isMoved) this.shake()
    if (this.GAMESTARTED) this.checkAnswer(BOARD)
  }

  // render 시 index.js에서 board를 인자로 받아와 모든 Block 인스턴스가 공유할 수 있도록 구현.
  render(BOARD) {
    const blockDiv = document.createElement("div")
    blockDiv.id = this.number
    blockDiv.classList.add("block")
    blockDiv.innerText = this.number
    blockDiv.addEventListener("click", () => {
      this.click(BOARD)
    })

    const boardDiv = document.getElementById("board")
    boardDiv.append(blockDiv)
    this.move()
  }
}

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

export default Block