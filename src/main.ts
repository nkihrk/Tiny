import { Engine } from './core/Engine';
import { Store } from './entities/Store';
import { Events } from './core/Events';
import { Canvas } from './plugins/Canvas';
import { ImageReader } from './plugins/ImageReader';
import { Zoom } from './plugins/Zoom';
import { Objects } from './plugins/Objects';
import { Pointer } from './plugins/Pointer';

// register plugins
Events.pointerdown.push(
  Pointer.onPointerdown,
  Canvas.onPointerdown,
  Objects.onPointerdown
);
Events.pointermove.push(
  Pointer.onPointermove,
  Canvas.onPointermove,
  Objects.onPointermove
);
Events.pointerup.push(
  Pointer.onPointerup,
  Canvas.onPointerup,
  Objects.onPointerup
);
Events.drop.push(ImageReader.onDrop);
Events.wheel.push(Zoom.onWheel);

// IIFE (Immediately Invoked Function Expression)
(function () {
  const container = document.getElementById('container');
  const selectBtn = document.getElementById('select-btn');
  const handBtn = document.getElementById('hand-btn');

  if (!container || !selectBtn || !handBtn) return;

  const store = new Store({
    container,
    selectBtn,
    handBtn,
  });
  const engine = new Engine(store);
  engine.start();
})();
