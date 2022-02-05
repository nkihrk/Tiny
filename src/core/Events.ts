import type { Store } from '../entities/Store';
import type { TPlugin } from '../interfaces/plugin';

export class Events {
  static pointerdown: TPlugin<PointerEvent>[] = [];
  static pointermove: TPlugin<PointerEvent>[] = [];
  static pointerup: TPlugin<PointerEvent>[] = [];
  static drop: TPlugin<DragEvent>[] = [];
  static wheel: TPlugin<WheelEvent>[] = [];
  static store: Store;

  static start(): void {
    Events._tools();
    Events._resize();
    Events._drag();
    Events._pointer();
    Events._wheel();
  }

  private static _tools(): void {
    const { selectBtn, handBtn } = Events.store;
    selectBtn.onclick = () => Events.store.setTool('select');
    handBtn.onclick = () => Events.store.setTool('hand');
  }

  private static _resize(): void {
    window.addEventListener(
      'resize',
      () => {
        const c = Events.store.canvas;
        const width = c.clientWidth;
        const height = c.clientHeight;
        c.width = width;
        c.height = height;

        // refresh scene
        Events.store.isRendered = false;
      },
      {
        passive: false,
      }
    );
  }

  private static _drag(): void {
    Events.store.canvas.addEventListener(
      'dragenter',
      (e: DragEvent) => {
        e.preventDefault();
      },
      {
        passive: false,
      }
    );

    Events.store.canvas.addEventListener(
      'dragover',
      (e: DragEvent) => {
        e.preventDefault();
      },
      {
        passive: false,
      }
    );

    Events.store.canvas.addEventListener(
      'drop',
      (e: DragEvent) => {
        Events.drop.forEach((v) => v(e, Events.store));
      },
      {
        passive: false,
      }
    );
  }

  private static _pointer(): void {
    Events.store.canvas.addEventListener(
      'pointerdown',
      (e: PointerEvent) => {
        Events.pointerdown.forEach((v) => v(e, Events.store));
      },
      {
        passive: false,
      }
    );

    window.addEventListener(
      'pointermove',
      (e: PointerEvent) => {
        Events.pointermove.forEach((v) => v(e, Events.store));
      },
      {
        passive: false,
      }
    );

    window.addEventListener(
      'pointerup',
      (e: PointerEvent) => {
        Events.pointerup.forEach((v) => v(e, Events.store));
      },
      {
        passive: false,
      }
    );
  }

  private static _wheel(): void {
    Events.store.canvas.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        Events.wheel.forEach((v) => v(e, Events.store));
      },
      {
        passive: false,
      }
    );
  }
}
