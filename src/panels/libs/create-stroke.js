export function createStroke() {
  let psAction = require("photoshop").action;

  let command = [
    // Set Layer Styles of current layer
    {
      _obj: "set",
      _target: [
        { _property: "layerEffects", _ref: "property" },
        { _enum: "ordinal", _ref: "layer", _value: "targetEnum" },
      ],
      to: {
        _obj: "layerEffects",
        frameFX: {
          _obj: "frameFX",
          color: { _obj: "RGBColor", blue: 0.0, grain: 0.0, red: 0.0 },
          enabled: true,
          mode: { _enum: "blendMode", _value: "normal" },
          opacity: { _unit: "percentUnit", _value: 100.0 },
          overprint: false,
          paintType: { _enum: "frameFill", _value: "solidColor" },
          present: true,
          showInDialog: true,
          size: { _unit: "pixelsUnit", _value: 30.0 },
          style: { _enum: "frameStyle", _value: "outsetFrame" },
        },
        scale: { _unit: "percentUnit", _value: 208.33333333333334 },
        solidFill: {
          _obj: "solidFill",
          color: { _obj: "RGBColor", blue: 0.0, grain: 0.0, red: 0.0 },
          enabled: true,
          mode: { _enum: "blendMode", _value: "normal" },
          opacity: { _unit: "percentUnit", _value: 100.0 },
          present: true,
          showInDialog: true,
        },
      },
    },
    // Rasterize current layer
    {
      _obj: "rasterizeLayer",
      _target: [{ _enum: "ordinal", _ref: "layer", _value: "targetEnum" }],
      what: { _enum: "rasterizeItem", _value: "layerStyle" },
    },
  ];
  return psAction.batchPlay(command, {});
}