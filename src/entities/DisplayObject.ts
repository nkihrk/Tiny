export class DisplayObject {
  imageBitmap!: ImageBitmap;
  color!: string;
  width!: number;
  height!: number;
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
  isSelected = false;

  constructor($img: ImageBitmap, $color: string) {
    const { width, height } = this._calcFixedSize(300, {
      width: $img.width,
      height: $img.height,
    });
    this.imageBitmap = $img;
    this.color = $color;
    this.width = width;
    this.height = height;
  }

  private _calcFixedSize(
    $fixedSize: number,
    $size: { width: number; height: number }
  ): { width: number; height: number } {
    const isLarger: boolean = $size.width > $size.height;
    const aspect: number = isLarger
      ? $size.width / $size.height
      : $size.height / $size.width;
    const width: number = isLarger ? $fixedSize * aspect : $fixedSize;
    const height: number = isLarger ? $fixedSize : $fixedSize * aspect;
    return { width, height };
  }
}
