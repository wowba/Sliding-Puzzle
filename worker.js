onmessage = function (e) {
  if (e.data === "start") {
    this.min = 0
    this.sec = 0
    this.msec = 0
    this.intervalId = this.setInterval(() => {
      this.msec += 10
      if (this.msec === 1000) {
        this.sec += 1
        this.msec = 0
      }
      if (this.sec === 60) {
        this.min += 1
        this.sec = 0
      }
      const result = [this.min, this.sec, this.msec, intervalId]
      postMessage(result)
    }, 10)
  }
  
  if (e.data === "stop") {
    clearInterval(this.intervalId)
  }
}