/**
 * A timer class for quiz
 */

export default class Timer {
  timeLeft: number;
  initialTime: number;
  endTime: number;

  private isRunning = false;
  private cb?: () => void;
  private updateCb?: () => void;
  private timeout?: NodeJS.Timeout;
  private interval?: NodeJS.Timeout;

  constructor(delay: number) {
    this.timeLeft = delay;
    this.initialTime = delay;
  }

  /**
   * Start timer
   */
  public start(): void {
    if (this.isRunning) return;
    clearTimeout(this.timeout);
    this.isRunning = true;
    this.endTime = new Date().getTime() + this.timeLeft;
    this.timeout = setTimeout(this._finish.bind(this), this.timeLeft);
    this.interval = setInterval(this._update.bind(this), 500);
    this._update();
  }

  /**
   * Pause timer
   */
  public pause(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.timeLeft = this._getElapsedTime();
    this._update();
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  /**
   * Get time left until the end of timer
   */
  public getTimeLeft(): number {
    if (this.isRunning) return this._getElapsedTime();
    else return this.timeLeft;
  }

  /**
   * How much time was set at first
   */
  public getInitialTime(): number {
    return this.initialTime;
  }

  /**
   * Set time left
   * @param delay Time
   */
  public setTimeLeft(delay: number): void {
    this.timeLeft = Math.max(0, delay);
    if (!this.isRunning) this.initialTime = delay;
    else this.timeLeft = Math.min(this.timeLeft, this.initialTime);
  }

  /**
   * Reset timer
   * @param delay Time
   */
  public resetTimer(delay: number): void {
    this.timeLeft = delay;
    this.initialTime = delay;
  }

  /**
   * Callback called periodically on timer update
   * @param fn Callback
   */
  public onUpdate(fn: () => void): void {
    this.updateCb = fn;
  }

  /**
   * Callback called when timer end
   * @param fn Callback
   */
  public onFinish(fn: () => void): void {
    this.cb = fn;
  }

  /**
   * On update
   */
  private _update() {
    if (this.updateCb) this.updateCb();
  }

  /**
   * On finish
   */
  private _finish() {
    this.pause();
    this.timeLeft = 0;
    if (this.cb) this.cb();
  }

  /**
   * Get elapsed time
   */
  private _getElapsedTime(): number {
    return Math.max(0, this.endTime - new Date().getTime());
  }
}
