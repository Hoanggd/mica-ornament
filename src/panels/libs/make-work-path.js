export function makeWorkPath() {
  let psAction = require("photoshop").action;

  let command = [
    // Set Selection
    {
      _obj: "set",
      _target: [{ _property: "selection", _ref: "channel" }],
      to: {
        _ref: [
          { _enum: "channel", _ref: "channel", _value: "transparencyEnum" },
          { _name: "Layer 1 copy 2", _ref: "layer" },
        ],
      },
    },
    // Expand
    {
      _obj: "expand",
      by: { _unit: "pixelsUnit", _value: 33.0 },
      selectionModifyEffectAtCanvasBounds: false,
    },
    // Subtract From Selection
    {
      _obj: "subtractFrom",
      _target: [{ _property: "selection", _ref: "channel" }],
      to: {
        _ref: [
          { _enum: "path", _ref: "path", _value: "vectorMask" },
          { _enum: "ordinal", _ref: "layer", _value: "targetEnum" },
        ],
      },
      vectorMaskParams: true,
      version: 1,
    },
    // Make path
    {
      _obj: "make",
      _target: [{ _ref: "path" }],
      from: { _property: "selection", _ref: "selectionClass" },
      tolerance: { _unit: "pixelsUnit", _value: 2.0 },
    },
  ];
  return psAction.batchPlay(command, {});
}
