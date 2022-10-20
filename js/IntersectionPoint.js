import Point from "./Point";

export default class IntersectionPoint extends Point {
  draw(canvasCtx) {
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
    canvasCtx.fillStyle = "red";
    canvasCtx.fill();
  }
}
