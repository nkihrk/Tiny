import { Store } from '../entities/Store';

export class Renderer {
  static onRender($store: Store): void {
    if ($store.isRendered) return;

    const { canvas, offscreen, ctx, ctxOffscreen, objects, offset, zoomRatio } =
      $store;

    if (!ctx || !ctxOffscreen) return;

    // clear offscreen
    offscreen.width = canvas.clientWidth;
    offscreen.height = canvas.clientHeight;

    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      const targetOffset = {
        x: object.offset.new.x * zoomRatio + offset.new.x,
        y: object.offset.new.y * zoomRatio + offset.new.y,
      };

      ctxOffscreen.save();

      ctxOffscreen.translate(targetOffset.x, targetOffset.y);
      ctxOffscreen.drawImage(
        object.imageBitmap,
        (-object.width / 2) * zoomRatio,
        (-object.height / 2) * zoomRatio,
        object.width * zoomRatio,
        object.height * zoomRatio
      );

      if (object.isSelected) {
        ctxOffscreen.beginPath();
        ctxOffscreen.strokeStyle = '#19a0fb';
        ctxOffscreen.lineWidth = 1;
        ctxOffscreen.strokeRect(
          (-object.width / 2) * zoomRatio,
          (-object.height / 2) * zoomRatio,
          object.width * zoomRatio,
          object.height * zoomRatio
        );
        ctxOffscreen.stroke();
      }

      ctxOffscreen.restore();
    }

    // clear main scene
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.drawImage(offscreen, 0, 0);

    // set rendered
    $store.isRendered = true;
  }

  static renderBuffer($store: Store): void {
    const { canvas, buffer, ctxBuffer, objects, offset, zoomRatio } = $store;

    if (!ctxBuffer) return;

    // clear offscreen
    buffer.width = canvas.clientWidth;
    buffer.height = canvas.clientHeight;

    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      const targetOffset = {
        x: object.offset.new.x * zoomRatio + offset.new.x,
        y: object.offset.new.y * zoomRatio + offset.new.y,
      };

      ctxBuffer.save();
      ctxBuffer.translate(targetOffset.x, targetOffset.y);
      ctxBuffer.fillStyle = `#${object.color}`;
      ctxBuffer.fillRect(
        (-object.width / 2) * zoomRatio,
        (-object.height / 2) * zoomRatio,
        object.width * zoomRatio,
        object.height * zoomRatio
      );
      ctxBuffer.restore();
    }
  }
}
