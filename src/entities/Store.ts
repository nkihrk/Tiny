import { DisplayObject } from './DisplayObject';

interface IProps {
  container: HTMLElement;
  selectBtn: HTMLElement;
  handBtn: HTMLElement;
}

interface IOptions {
  currentTool: 'select' | 'hand';
}

export class Store {
  container!: HTMLElement;
  selectBtn!: HTMLElement;
  handBtn!: HTMLElement;
  canvas: HTMLCanvasElement = document.createElement('canvas');
  offscreen: HTMLCanvasElement = document.createElement('canvas');
  buffer: HTMLCanvasElement = document.createElement('canvas');
  ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
  ctxOffscreen: CanvasRenderingContext2D | null =
    this.offscreen.getContext('2d');
  ctxBuffer: CanvasRenderingContext2D | null = this.buffer.getContext('2d');
  objects: DisplayObject[] = [];
  offset = {
    new: {
      x: 0,
      y: 0,
    },
    prev: {
      x: 0,
      y: 0,
    },
  };
  zoomRatio = 1;
  isRendered = false;
  options: IOptions = {
    currentTool: 'select',
  };

  constructor($props: IProps) {
    this.container = $props.container;
    this.selectBtn = $props.selectBtn;
    this.handBtn = $props.handBtn;

    // set default toolbar
    this.setTool('select');
  }

  setTool($tool: 'select' | 'hand'): void {
    this.options.currentTool = $tool;

    // initialize
    this._deactivate(this.selectBtn);
    this._deactivate(this.handBtn);

    if ($tool === 'select') {
      this._activate(this.selectBtn);
    } else if ($tool === 'hand') {
      this._activate(this.handBtn);
    }

    // set cursor
    this._setCursor($tool);
  }

  private _setCursor($tool: 'select' | 'hand'): void {
    this.container.classList.remove('grab');

    if ($tool === 'hand') {
      this.container.classList.add('grab');
    }
  }

  private _activate($element: HTMLElement): void {
    if (!$element.classList.contains('active'))
      $element.classList.add('active');
  }

  private _deactivate($element: HTMLElement): void {
    if ($element.classList.contains('active'))
      $element.classList.remove('active');
  }
}
