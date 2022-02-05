import { Renderer } from '../core/Renderer';
import { DisplayObject } from '../entities/DisplayObject';
import { Store } from '../entities/Store';
import { Pointer } from './Pointer';

export class Objects {
  static isEnabled = false;
  static targets: DisplayObject[] = [];

  static onPointerdown($event: PointerEvent, $store: Store): void {
    if ($store.options.currentTool !== 'select') return;

    // initialize selected
    $store.objects.forEach((v) => (v.isSelected = false));

    // render color buffer
    Renderer.renderBuffer($store);
    const rgb = $store.ctxBuffer?.getImageData(
      $event.clientX,
      $event.clientY,
      1,
      1
    ).data;

    if (!rgb) return;

    const hex = ((rgb[0] << 16) | (rgb[1] << 8) | rgb[2]).toString(16);
    const targets = $store.objects.filter((v) => v.color === hex);

    if (targets.length === 0) {
      Objects.targets = [];
      // refresh scene
      $store.isRendered = false;
      return;
    }

    // set targets
    Objects.targets = targets;

    // set selected
    Objects.targets.forEach((target) => {
      target.isSelected = true;
      target.offset.prev = { ...target.offset.new };
    });

    // enable
    Objects.isEnabled = true;
    // refresh scene
    $store.isRendered = false;
  }

  static onPointermove($event: PointerEvent, $store: Store): void {
    if ($store.options.currentTool !== 'select') return;
    if (!Objects.isEnabled) return;

    const { zoomRatio } = $store;
    Objects.targets.forEach((object) => {
      object.offset.new = {
        x: Pointer.diffOffset.x / zoomRatio + object.offset.prev.x,
        y: Pointer.diffOffset.y / zoomRatio + object.offset.prev.y,
      };
    });

    // refresh scene
    $store.isRendered = false;
  }

  static onPointerup($event: PointerEvent, $store: Store): void {
    if ($store.options.currentTool !== 'select') return;

    // disable
    Objects.isEnabled = false;
  }
}
