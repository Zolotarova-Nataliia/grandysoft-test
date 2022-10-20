import IntersectionPoint from "./IntersectionPoint";
import Line from "./Line";
import Point from "./Point";

export default class Scene {
  constructor(width, height) {
    this.lines = [];
    this.width = width;
    this.height = height;
    this.currentLine = null;
    this.collapseAnimationFrameId = 0;
    this.intersectionPoints = [];
  }

  draw(canvasCtx) {
    canvasCtx.clearRect(0, 0, this.width, this.height);
    this.lines.forEach((obj) => {
      obj.draw(canvasCtx);
    });
    this.intersectionPoints.forEach((el) => {
      el.draw(canvasCtx);
    });
  }

  cancelLine() {
    if (this.currentLine) {
      this.lines = this.lines.filter((el) => el !== this.currentLine);
      this.currentLine = null;
      this.checkIntersections();
    }
  }

  startLine(x, y) {
    const line = new Line(new Point(x, y), new Point(x, y));
    this.currentLine = line;
    this.lines.push(line);
  }

  checkIntersections() {
    this.intersectionPoints = [];
    for (let i = 0; i < this.lines.length; i++) {
      for (let j = i + 1; j < this.lines.length; j++) {
        const point = this.lines[i].findIntersection(this.lines[j]);
        if (point) {
          this.intersectionPoints.push(new IntersectionPoint(point.x, point.y));
        }
      }
    }
  }

  moveLineEndPoint(x, y) {
    if (this.currentLine === null) return;
    this.currentLine.moveEndpoint(x, y);
    this.checkIntersections();
  }

  finishLine() {
    this.currentLine = null;
  }

  collapseLines(time, canvasCtx) {
    cancelAnimationFrame(this.collapseAnimationFrameId);
    let startTime = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      let timeDiff = timestamp - startTime;
      const progress = Math.min(timeDiff / time);
      this.lines.forEach((obj) => {
        obj.collapse(progress);
      });

      if (timeDiff < time) {
        this.collapseAnimationFrameId = requestAnimationFrame(step);
      } else {
        this.lines = [];
      }
      this.checkIntersections();
      this.draw(canvasCtx);
    };
    this.collapseAnimationFrameId = requestAnimationFrame(step);
  }
}
