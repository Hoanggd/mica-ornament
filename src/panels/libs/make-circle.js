export function makeCircle(anchor) {
  const [x, y] = anchor;
  let psAction = require("photoshop").action;

  let command = [
    // Make fill layer
    {
      _obj: "make",
      _target: [{ _ref: "contentLayer" }],
      layerID: 9,
      using: {
        _obj: "contentLayer",
        shape: {
          _obj: "ellipse",
          bottom: { _unit: "pixelsUnit", _value: y + 33 },
          left: { _unit: "pixelsUnit", _value: x - 33 },
          right: { _unit: "pixelsUnit", _value: x + 33 },
          top: { _unit: "pixelsUnit", _value: y - 33 },
          unitValueQuadVersion: 1,
        },
        strokeStyle: {
          _obj: "strokeStyle",
          fillEnabled: false,
          strokeEnabled: true,
          strokeStyleBlendMode: { _enum: "blendMode", _value: "normal" },
          strokeStyleContent: {
            _obj: "solidColorLayer",
            color: { _obj: "RGBColor", blue: 0.0, grain: 0.0, red: 0.0 },
          },
          strokeStyleLineAlignment: {
            _enum: "strokeStyleLineAlignment",
            _value: "strokeStyleAlignOutside",
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
          strokeStyleLineWidth: { _unit: "pixelsUnit", _value: 40.0 },
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
