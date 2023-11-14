import { createStrokeAndAddRect } from "./create-stroke";

const app = require("photoshop").app;
const core = require("photoshop").core;
const constants = require("photoshop").constants;

const SIZE = 1772;
const findLayerByName = (name) => {
  return app.activeDocument.layers.find((item) => item.name === name);
};

export const createSafeZoneFromPng = async (file) => {
  async function openDocument() {
    await app.open(file);

    // 1. Rename
    const currentDocument = app.activeDocument;
    let activeLayer = currentDocument.activeLayers[0];

    // 2. Image Size
    await currentDocument.revealAll();
    await currentDocument.trim();
    const width = currentDocument.width;
    const height = currentDocument.height;
    const ratio = (SIZE - 112) / Math.max(width, height);
    await currentDocument.resizeImage(width * ratio, height * ratio, 150);
    await currentDocument.resizeCanvas(
      SIZE,
      SIZE,
      constants.AnchorPosition.MIDDLECENTER
    );
    await currentDocument.resizeCanvas(
      SIZE * 3,
      SIZE,
      constants.AnchorPosition.MIDDLELEFT
    );

    // 3. Duplicate layer
    await activeLayer.duplicate();
    await activeLayer.translate(
      { _unit: "pixelsUnit", _value: SIZE },
      { _unit: "pixelsUnit", _value: 0 }
    );
    activeLayer = currentDocument.activeLayers[0];
    await activeLayer.duplicate();
    await activeLayer.translate(
      { _unit: "pixelsUnit", _value: SIZE },
      { _unit: "pixelsUnit", _value: 0 }
    );

    // 4. Add guides
    currentDocument.guides.add(constants.Direction.HORIZONTAL, 0);
    currentDocument.guides.add(constants.Direction.HORIZONTAL, SIZE / 2);
    currentDocument.guides.add(constants.Direction.HORIZONTAL, SIZE);
    currentDocument.guides.add(constants.Direction.VERTICAL, 0);
    currentDocument.guides.add(constants.Direction.VERTICAL, SIZE * 0.5);
    currentDocument.guides.add(constants.Direction.VERTICAL, SIZE * 1);
    currentDocument.guides.add(constants.Direction.VERTICAL, SIZE * 1.5);
    currentDocument.guides.add(constants.Direction.VERTICAL, SIZE * 2);
    currentDocument.guides.add(constants.Direction.VERTICAL, SIZE * 2.5);
    currentDocument.guides.add(constants.Direction.VERTICAL, SIZE * 3);

    // 5. Create stroke
    await createStrokeAndAddRect();

    // 6. Find hole position
    const layer1 = findLayerByName("Layer 1");
    const layer2 = findLayerByName("Layer 1 copy");
    const rectangle = findLayerByName("Rectangle 1");

    layer1.visible = false;
    layer2.visible = false;

    const totalWeight = currentDocument.histogram[0];
    const halfWeight = totalWeight / 2;

    let currentWeight = totalWeight;
    let i = 2;
    let direction = 1;

    while (true) {
      rectangle.translate(direction * (SIZE / i), 0);
      currentWeight = currentDocument.histogram[0];
      direction = currentWeight > halfWeight ? 1 : -1;

      if (SIZE / i < 1) {
        break;
      }
      i = i * 2;
    }

    const balanceLine = rectangle.bounds.right;
    rectangle.delete();
    layer1.visible = true;
    layer2.visible = true;
  }

  try {
    return await core.executeAsModal(openDocument, {
      command: "opening file",
    });
  } catch (error) {
    console.log("error opening file as document", error);
  }
};
