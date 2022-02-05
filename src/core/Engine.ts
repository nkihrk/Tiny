import { Store } from '../entities/Store';
import { Events } from './Events';
import { Renderer } from './Renderer';

export class Engine {
  store!: Store;

  constructor($store: Store) {
    this.store = $store;
  }

  start(): void {
    // initialize
    this._init();

    // start events
    this._events();

    // start renderings
    this._render();
  }

  private _init(): void {
    const { container } = this.store;
    // insert canvas into the base element
    container.appendChild(this.store.canvas);
  }

  private _events(): void {
    Events.store = this.store;
    Events.start();
  }

  private _render(): void {
    const r: FrameRequestCallback = () => {
      Renderer.onRender(this.store);
      requestAnimationFrame(r);
    };
    requestAnimationFrame(r);
  }
}
