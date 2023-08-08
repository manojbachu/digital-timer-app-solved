// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  renderTimeLimitController = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="set-timer-limit-container">
        <button
          onClick={this.onDecreaseTime}
          type="button"
          className="set-time-button"
          disabled={isButtonDisabled}
        >
          -
        </button>
        <p className="time-limit">{timerLimitInMinutes}</p>
        <button
          onClick={this.onIncreaseTime}
          disabled={isButtonDisabled}
          type="button"
          className="set-time-button"
        >
          +
        </button>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onStartOrPause = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onDecreaseTime = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 0) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTime = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const startOrPauseImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return (
      <div className="digital-timer-app-container">
        <h1>Digital Timer</h1>
        <div className="container">
          <div className="clock-container">
            <div className="time-container">
              <h1 className="time">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="clock-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="controls-container">
            <div className="clock-controllers-container">
              <button
                onClick={this.onStartOrPause}
                type="button"
                className="start-or-pause-button"
              >
                <img
                  className="start-or-pause-img"
                  src={startOrPauseImg}
                  alt={isTimerRunning ? 'pause icon' : 'play icon'}
                />
                <h1 className="start-or-pause-status-text">
                  {isTimerRunning ? 'Paused' : 'Start'}
                </h1>
              </button>
              <button
                onClick={this.onResetTimer}
                type="button"
                className="start-or-pause-button"
              >
                <img
                  className="start-or-pause-img"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <h1 className="start-or-pause-status-text">Reset</h1>
              </button>
            </div>
            <p className="guideline">Set Timer limit</p>
            {this.renderTimeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
