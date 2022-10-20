export default function getCanvasRelativeCoordinates(x, y, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: x - rect.x,
    y: y - rect.y,
  };
}
