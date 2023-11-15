import { flatten, sortBy } from "lodash";
import { createStrokeAndAddRect } from "./create-stroke";
import { makeWorkPath } from "./make-work-path";
import { makeCircle } from "./make-circle";

const app = require("photoshop").app;
const core = require("photoshop").core;
const constants = require("photoshop").constants;

const SIZE = 1772;

const findLayerByName = (name) => {
  return app.activeDocument.layers.find((item) => item.name === name);
};

export const createSafeZoneFromPngs = async (files, folder) => {
  async function processFile(file) {
    await app.open(file);

    // Rename
    const currentDocument = app.activeDocument;
    let activeLayer = currentDocument.activeLayers[0];

    // Image Size
    await currentDocument.revealAll();
    await currentDocument.trim();
    const width = currentDocument.width;
    const height = currentDocument.height;
    const ratio = (SIZE - 280) / Math.max(width, height);
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

    // Duplicate layer
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

    // Add guides
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

    // Create stroke
    await createStrokeAndAddRect();

    // Find hole position
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

    await makeWorkPath();

    const balanceLine = rectangle.bounds.right;
    const path = currentDocument.pathItems.getByName("Work Path");
    const pathPoints = flatten(
      path.subPathItems.map((item) => item.pathPoints)
    );
    const balancePoints = pathPoints
      .filter((point) => Math.abs(point.anchor[0] - balanceLine) < 20)
      .map((item) => item.anchor);
    const highestBalancePoint = sortBy(balancePoints, (point) => point[1])[0];

    // Make circle
    makeCircle(highestBalancePoint);

    // Show all layer
    path.deselect();
    rectangle.delete();
    layer1.visible = true;
    layer2.visible = true;

    // Save file and close document
    const entry = await folder.createEntry(currentDocument.name, {
      overwrite: true,
    });
    await currentDocument.saveAs.png(entry);
    currentDocument.closeWithoutSaving();
  }

  try {
    return await core.executeAsModal(
      async (executionContext) => {
        app.documents.forEach((document) => document.closeWithoutSaving());
        for (const [i, value] of files.entries()) {
          executionContext.reportProgress({
            value: (i + 1) / files.length,
            commandName: `Processing ${i + 1}/${files.length}`,
          });
          await processFile(value);
        }
      },
      {
        command: "opening file",
      }
    );
  } catch (error) {
    console.log("error opening file as document", error);
  }
};
