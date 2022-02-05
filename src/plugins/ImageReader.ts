import { DisplayObject } from '../entities/DisplayObject';
import { Store } from '../entities/Store';
import * as NProgress from 'nprogress';

const VALID_BLOB = '.(jpe?g|png|bmp)$';

export class ImageReader {
  static async onDrop($event: DragEvent, $store: Store): Promise<void> {
    $event.preventDefault();

    // start progressing
    NProgress.start();

    const { canvas, offset, zoomRatio } = $store;
    const data = $event.dataTransfer;
    if (!data) return;
    const items: DataTransferItemList = data.items;
    const results: any[] = [];
    const promises: any[] = [];

    for (const i in items) {
      if (items.hasOwnProperty(i)) {
        const entry = items[i].webkitGetAsEntry();
        promises.push(ImageReader.scanFiles(entry, results));
      }
    }

    await Promise.all(promises);

    for (let i = 0; i < results.length; i++) {
      results[i].file(async (file: File) => {
        if (!ImageReader.validateFormatByName(file, VALID_BLOB)) {
          return;
        }

        // calcurate initial offset
        const rect = canvas.getBoundingClientRect();
        const objectOffset = {
          x: ($event.clientX - rect.x - offset.new.x) / zoomRatio,
          y: ($event.clientY - rect.y - offset.new.y) / zoomRatio,
        };

        const img = await createImageBitmap(file);
        const color = ImageReader.generateColorId(
          $store.objects.map((v) => v.color)
        );
        const object = new DisplayObject(img, color);
        object.offset.new = { ...objectOffset };
        object.offset.prev = { ...objectOffset };
        object.isSelected = true;

        // push to store
        $store.objects.push(object);
        // refresh scene
        $store.isRendered = false;

        if (i === results.length - 1) {
          // end progressing
          NProgress.done();
        }
      });
    }
  }

  static async scanFiles($entry: any, $tmpObject: any) {
    switch (true) {
      case $entry.isDirectory: {
        const entryReader = $entry.createReader();
        const entries: any[] = await new Promise((resolve) => {
          entryReader.readEntries((e: any) => resolve(e));
        });
        await Promise.all(
          entries.map((e) => ImageReader.scanFiles(e, $tmpObject))
        );
        break;
      }

      case $entry.isFile: {
        $tmpObject.push($entry);
        break;
      }
    }
  }

  static validateFormatByName($file: File, $regExp: string): boolean {
    const regex = new RegExp($regExp);
    return regex.test($file.name);
  }

  static generateColorId($colorIds: string[]): string {
    let color = '';
    let isUnique = false;

    while (!isUnique) {
      color = ImageReader.getRandomColor();
      isUnique = color.length === 6 && color !== '000000';
      if (isUnique) {
        isUnique =
          $colorIds.filter((colorId: string) => {
            return colorId === color;
          }).length === 0;
      }
    }

    return color;
  }

  static getRandomColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
}
