import { Store } from '../entities/Store';

export class Pointer {
  static prevOffset = { x: 0, y: 0 };
  static diffOffset = { x: 0, y: 0 };
  static isEnabled = false;

  static onPointerdown($event: PointerEvent, $store: Store): void {
    $store.offset.prev = { ...$store.offset.new };
    Pointer.prevOffset = { x: $event.clientX, y: $event.clientY };

    // enable
    Pointer.isEnabled = true;
  }

  static onPointermove($event: PointerEvent, $store: Store): void {
    if (!Pointer.isEnabled) return;

    Pointer.diffOffset = {
      x: $event.clientX - Pointer.prevOffset.x,
      y: $event.clientY - Pointer.prevOffset.y,
    };
  }

  static onPointerup($event: PointerEvent, $store: Store): void {
    // disable
    Pointer.isEnabled = false;
  }
}
