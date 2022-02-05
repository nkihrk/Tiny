import { Store } from '../entities/Store';

export class Zoom {
  static onWheel($event: WheelEvent, $store: Store): void {
    const { offset, canvas } = $store;
    const rect: DOMRect = canvas.getBoundingClientRect();
    const pointerOffset = {
      x: $event.clientX - rect.x,
      y: $event.clientY - rect.y,
    };
    let ratio = 1;

    if ($event.deltaY > 0) {
      ratio = 1 - 0.25;
    } else {
      ratio = 1 + 0.25;
    }

    offset.new = {
      x: (offset.new.x - pointerOffset.x) * ratio + pointerOffset.x,
      y: (offset.new.y - pointerOffset.y) * ratio + pointerOffset.y,
    };

    // update zoomRatio
    $store.zoomRatio *= ratio;

    // refresh scene
    $store.isRendered = false;
  }
}
