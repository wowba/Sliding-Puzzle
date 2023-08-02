const worker = new Worker('worker.js')

class Timer {
  constructor() {
    this.min = 0
    this.sec = 0
    this.msec = 0
  }

  start() {
    worker.postMessage("start")
    worker.onmessage = (e) => {
      let [min, sec, msec] = e.data
      this.min = min
      this.sec = sec
      this.msec = msec
      this.render()
    }
  }

  stop() {
    worker.postMessage("stop")
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