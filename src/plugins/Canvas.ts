import { Store } from '../entities/Store';
import { Pointer } from './Pointer';

export class Canvas {
  static prevOffset = { x: 0, y: 0 };
  static isEnabled = false;
  static prevTool: 'select' | 'hand' = 'select';

  static onPointerdown($event: PointerEvent, $store: Store): void {
    // if wheel button is clicked
    if ($event.button === 1) {
      Canvas.prevTool = $store.options.currentTool;
      $store.setTool('hand');
    }

    if ($store.options.currentTool !== 'hand') return;

    $store.offset.prev = { ...$store.offset.new };
    Canvas.prevOffset = { x: $event.clientX, y: $event.clientY };

    // enable
    Canvas.isEnabled = true;
  }

  static onPointermove($event: PointerEvent, $store: Store): void {
    if ($store.options.currentTool !== 'hand') return;
    if (!Canvas.isEnabled) return;

    const { offset } = $store;
    $store.offset.new = {
      x: Pointer.diffOffset.x + offset.prev.x,
      y: Pointer.diffOffset.y + offset.prev.y,
    };

    // refresh scene
    $store.isRendered = false;
  }

  static onPointerup($event: PointerEvent, $store: Store): void {
    if ($store.options.currentTool !== 'hand') return;

    // disable
    Canvas.isEnabled = false;

    // switch to previous tool
    if ($event.button === 1) {
      $store.setTool(Canvas.prevTool);
    }
  }
}
