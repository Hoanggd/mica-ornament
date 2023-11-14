export function createStrokeAndAddRect() {
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
    // Make fill layer
    {
      _obj: "make",
      _target: [{ _ref: "contentLayer" }],
      layerID: 9,
      using: {
        _obj: "contentLayer",
        shape: {
          _obj: "rectangle",
          bottom: { _unit: "pixelsUnit", _value: 1772.0 },
          bottomLeft: { _unit: "pixelsUnit", _value: 0.0 },
          bottomRight: { _unit: "pixelsUnit", _value: 0.0 },
          left: { _unit: "pixelsUnit", _value: 1772.0 },
          right: { _unit: "pixelsUnit", _value: 3544.0 },
          top: { _unit: "pixelsUnit", _value: 0.0 },
          topLeft: { _unit: "pixelsUnit", _value: 0.0 },
          topRight: { _unit: "pixelsUnit", _value: 0.0 },
          unitValueQuadVersion: 1,
        },
        strokeStyle: {
          _obj: "strokeStyle",
          fillEnabled: true,
          strokeEnabled: false,
          strokeStyleBlendMode: { _enum: "blendMode", _value: "normal" },
          strokeStyleContent: {
            _obj: "solidColorLayer",
            color: { _obj: "RGBColor", blue: 0.0, grain: 0.0, red: 0.0 },
          },
          strokeStyleLineAlignment: {
            _enum: "strokeStyleLineAlignment",
            _value: "strokeStyleAlignCenter",
          },
          strokeStyleLineCapType: {
            _enum: "strokeStyleLineCapType",
            _value: "strokeStyleButtCap",
          },
          strokeStyleLineDashOffset: { _unit: "pointsUnit", _value: 0.0 },
          strokeStyleLineDashSet: [],
          strokeStyleLineJoinType: {
            _enum: "strokeStyleLineJoinType",
            _value: "strokeStyleMiterJoin",
          },
          strokeStyleLineWidth: { _unit: "pixelsUnit", _value: 1.0 },
          strokeStyleMiterLimit: 100.0,
          strokeStyleOpacity: { _unit: "percentUnit", _value: 100.0 },
          strokeStyleResolution: 150.0,
          strokeStyleScaleLock: false,
          strokeStyleStrokeAdjust: false,
          strokeStyleVersion: 2,
        },
        type: {
          _obj: "solidColorLayer",
          color: { _obj: "RGBColor", blue: 255.0, grain: 255.0, red: 255.0 },
        },
      },
    },
  ];
  return psAction.batchPlay(command, {});
}
