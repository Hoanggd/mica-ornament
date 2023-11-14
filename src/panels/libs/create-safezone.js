const app = require("photoshop").app;
const core = require("photoshop").core;
const constants = require("photoshop").constants;

const SIZE = 1772;

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
  }

  try {
    return await core.executeAsModal(openDocument, {
      command: "opening file",
    });
  } catch (error) {
    console.log("error opening file as document", error);
  }
};
