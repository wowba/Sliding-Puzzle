class Timer {
  constructor() {
    this.min = 0
    this.sec = 0
    this.msec = 0
    this.setIntervalId
  }

  start() {
    this.setIntervalId = setInterval(() => {
      this.msec += 10
      if (this.msec === 1000) {
        this.sec += 1
        this.msec = 0
      }
      if (this.sec === 60) {
        this.min += 1
        this.sec = 0
      }
      this.render()
    }, 10)
  }

  stop() {
    clearInterval(this.setIntervalId)
  }

  reset() {
    this.min = 0
    this.sec = 0
    this.msec = 0
    this.render()
  }
  
  render() {
    const minSpan = document.getElementById("min")
    const secSpan = document.getElementById("sec")
    const msecSpan = document.getElementById("msec")
    minSpan.innerText = plusMinusZero(this.min)
    secSpan.innerText = plusMinusZero(this.sec)
    msecSpan.innerText = plusMinusZero(this.msec)
  }
}

const plusMinusZero = (num) => {
  if (String(num).length === 1) {
    return "0" + String(num)
  }
  if (String(num).length === 3) {
    return String(num).substr(0, 2)
  }
  return String(num)
}

export default Timer