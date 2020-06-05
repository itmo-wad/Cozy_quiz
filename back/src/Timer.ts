export default class Timer {
  timeLeft: number;
  initialTime: number;
  endTime: number;

  private isRunning = false;
  private cb?: () => void;
  private timeout?: NodeJS.Timeout;

  constructor(delay: number) {
    this.timeLeft = delay;
    this.initialTime = delay;
  }

  public start(): void {
    this.isRunning = true;
    this.endTime = new Date().getTime() + this.timeLeft;
    this.timeout = setTimeout(this._finish.bind(this), this.timeLeft);
  }

  public pause(): void {
    this.isRunning = false;
    this.timeLeft = this._getElapsedTime();
    clearTimeout(this.timeout);
  }

  public getTimeLeft(): number {
    if (this.isRunning) return this._getElapsedTime();
    else return this.timeLeft;
  }

  public getInitialTime(): number {
    return this.initialTime;
  }

  public setTimeLeft(delay: number): void {
    this.timeLeft = Math.max(0, delay);
    if (!this.isRunning) this.initialTime = delay;
    else this.timeLeft = Math.min(this.timeLeft, this.initialTime);
  }

  public resetTimer(delay: number): void {
    this.timeLeft = delay;
    this.initialTime = delay;
  }

  public onFinish(fn: () => void): void {
    this.cb = fn;
  }

  private _finish() {
    this.pause();
    this.timeLeft = 0;
    if (this.cb) this.cb();
  }

  private _getElapsedTime(): number {
    return Math.max(0, this.endTime - new Date().getTime());
  }
}
