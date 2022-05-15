/**
 * @emotion/is-prop-valid uses a list of props to match against.
 *
 * @see https://github.com/emotion-js/emotion/blob/main/packages/is-prop-valid/src/props.js
 */
import isPropValid from '@emotion/is-prop-valid';

/**
 * # HTML attribute reference
 *
 * For a list of valid HTML attributes, and their valid elements...
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */

/**
 * A list HTML elements that accept width and height attributes.
 */
const widthAndHeightElements = {
  canvas: true,
  embed: true,
  img: true,
  iframe: true,
  input: true,
  object: true,
  video: true,
  /**
   * Deprecated. Use the CSS width property instead.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-width
   */
  table: true,
  th: true,
  td: true,
};

/**
 * A list of SVG HTML elements.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 */
const svgElements = {
  altGlyph: true,
  altGlyphDef: true,
  animate: true,
  animateColor: true,
  animateMotion: true,
  animateTransform: true,
  circle: true,
  clipPath: true,
  colorProfile: true,
  cursor: true,
  defs: true,
  desc: true,
  ellipse: true,
  feBlend: true,
  feColorMatrix: true,
  feComponentTransfer: true,
  feComposite: true,
  feConvolveMatrix: true,
  feDiffuseLighting: true,
  feDisplacementMap: true,
  feDropShadow: true,
  feFlood: true,
  feFuncA: true,
  feFuncB: true,
  feFuncG: true,
  feFuncR: true,
  feGaussianBlur: true,
  feImage: true,
  feMerge: true,
  feMergeNode: true,
  feMorphology: true,
  feOffset: true,
  fePointLight: true,
  feSpecularLighting: true,
  feSpotLight: true,
  feTile: true,
  feTurbulence: true,
  filter: true,
  foreignObject: true,
  g: true,
  glyph: true,
  glyphRef: true,
  image: true,
  line: true,
  linearGradient: true,
  marker: true,
  mask: true,
  metadata: true,
  missingGlyph: true,
  mpath: true,
  path: true,
  pattern: true,
  polygon: true,
  polyline: true,
  radialGradient: true,
  rect: true,
  script: true,
  set: true,
  stop: true,
  svg: true,
  switch: true,
  symbol: true,
  text: true,
  textPath: true,
  title: true,
  tref: true,
  tspan: true,
  use: true,
  view: true,
};

/**
 * A custom list of disallowed props. To take care of the 1% that slip passed
 * @emotion/is-prop-valid's REGEX based prop matching process.
 *
 * Although all of these props are valid HTML attributes. However, not
 * all HTML elements can render the same props.
 *
 * For example, the x prop is used only by SVG-based elements.
 */
const disallowedProps = {
  /**
   * Not a valid HTML attribute.
   */
  dashed: true,
  /**
   * This is only available for iFrames. However, it's not supported by any
   * browser.
   *
   * @see https://caniuse.com/iframe-seamless
   */
  seamless: true,
  /**
   * A valid HTML property, but is only used for <option />.
   * It is also not advised by React to use selected to select a value.
   *
   * Use the `defaultValue` or `value` props on <select> instead of
   * setting `selected` on <option>.
   *
   * @see https://github.com/facebook/react/blob/c88fb49d37fd01024e0a254a37b7810d107bdd1d/packages/react-dom/src/__tests__/ReactDOMSelect-test.js#L650
   */
  selected: true,
};

/**
 * Used by Hitarea, but not an HTML attribute.
 */
const hitAreaProps = {
  active: true,
  focus: true,
  hover: true,
  keyboardFocus: true,
};

/**
 * A list of HTML properties that are only valid for a tiny subset of
 * HTML elements.
 *
 * Structure:
 * {
 *  property: { allowed: true }
 * }
 */
const nonStandardProps = {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action
   */
  action: { form: true },
  /**
   * `color` is only valid for usage in Safari, specifically for the
   * <link /> HTML element.
   *
   * We need to filter this out because it's used a lot in CSS-in-JS
   * props and variants.
   *
   * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/pinnedTabs/pinnedTabs.html
   */
  color: { link: true },
  /**
   * Common for CSS-in-JS usage, but only valid for SVG and
   * media/embeddable elements.
   */
  height: {
    ...svgElements,
    ...widthAndHeightElements,
  },
  /**
   * Common for CSS-in-JS usage, but only valid for certain form elements.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
   */
  label: {
    optgroup: true,
    option: true,
    track: true,
  },
  /**
   * Common for CSS-in-JS usage, but only valid a couple of HTML elements.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading
   */
  loading: {
    img: true,
    iframe: true,
  },
  /**
   * Common for CSS-in-JS usage, but only valid a couple of HTML elements.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#attr-open
   */
  open: {
    details: true,
    dialog: true,
  },
  /**
   * Common for CSS-in-JS usage, but only valid a couple of HTML elements.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-size
   */
  size: {
    input: true,
    select: true,
  },
  /**
   * Common for CSS-in-JS usage, but only valid for SVG and
   * media/embeddable elements.
   */
  width: {
    ...svgElements,
    ...widthAndHeightElements,
  },
  /**
   * Common for CSS-in-JS usage, but only valid for textarea.
   *
   * We use `wrap` as a variant name in `Stack`.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap
   */
  wrap: { textarea: true },
};

/**
 * A list of HTML attributes for SVG elements, only.
 *
 * The way we're checking is very naive. For example, azimuth is only valid
 * for certain SVG sub-elements such as <feDistantLight />.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 */
const svgProps = {
  accentHeight: true,
  accumulate: true,
  additive: true,
  alignmentBaseline: true,
  allowReorder: true,
  alphabetic: true,
  amplitude: true,
  arabicForm: true,
  ascent: true,
  attributeName: true,
  attributeType: true,
  autoReverse: true,
  azimuth: true,
  baseFrequency: true,
  baselineShift: true,
  baseProfile: true,
  bbox: true,
  begin: true,
  bias: true,
  by: true,
  calcMode: true,
  capHeight: true,
  clip: true,
  clipPathUnits: true,
  clipPath: true,
  clipRule: true,
  colorInterpolation: true,
  colorInterpolationFilters: true,
  colorProfile: true,
  colorRendering: true,
  contentScriptType: true,
  contentStyleType: true,
  cursor: true,
  cx: true,
  cy: true,
  d: true,
  decelerate: true,
  descent: true,
  diffuseConstant: true,
  direction: true,
  display: true,
  divisor: true,
  dominantBaseline: true,
  dur: true,
  dx: true,
  dy: true,
  edgeMode: true,
  elevation: true,
  enableBackground: true,
  end: true,
  exponent: true,
  externalResourcesRequired: true,
  fill: true,
  fillOpacity: true,
  fillRule: true,
  filter: true,
  filterRes: true,
  filterUnits: true,
  floodColor: true,
  floodOpacity: true,
  focusable: true,
  fontFamily: true,
  fontSize: true,
  fontSizeAdjust: true,
  fontStretch: true,
  fontStyle: true,
  fontVariant: true,
  fontWeight: true,
  format: true,
  from: true,
  fr: true, // valid SVG element but React will ask for removal
  fx: true,
  fy: true,
  g1: true,
  g2: true,
  glyphName: true,
  glyphOrientationHorizontal: true,
  glyphOrientationVertical: true,
  glyphRef: true,
  gradientTransform: true,
  gradientUnits: true,
  hanging: true,
  horizAdvX: true,
  horizOriginX: true,
  ideographic: true,
  imageRendering: true,
  in: true,
  in2: true,
  intercept: true,
  k: true,
  k1: true,
  k2: true,
  k3: true,
  k4: true,
  kernelMatrix: true,
  kernelUnitLength: true,
  kerning: true,
  keyPoints: true,
  keySplines: true,
  keyTimes: true,
  lengthAdjust: true,
  letterSpacing: true,
  lightingColor: true,
  limitingConeAngle: true,
  local: true,
  markerEnd: true,
  markerMid: true,
  markerStart: true,
  markerHeight: true,
  markerUnits: true,
  markerWidth: true,
  mask: true,
  maskContentUnits: true,
  maskUnits: true,
  mathematical: true,
  mode: true,
  numOctaves: true,
  offset: true,
  opacity: true,
  operator: true,
  order: true,
  orient: true,
  orientation: true,
  origin: true,
  overflow: true,
  overlinePosition: true,
  overlineThickness: true,
  panose1: true,
  paintOrder: true,
  pathLength: true,
  patternContentUnits: true,
  patternTransform: true,
  patternUnits: true,
  pointerEvents: true,
  points: true,
  pointsAtX: true,
  pointsAtY: true,
  pointsAtZ: true,
  preserveAlpha: true,
  preserveAspectRatio: true,
  primitiveUnits: true,
  r: true,
  radius: true,
  refX: true,
  refY: true,
  renderingIntent: true,
  repeatCount: true,
  repeatDur: true,
  requiredExtensions: true,
  requiredFeatures: true,
  restart: true,
  result: true,
  rotate: true,
  rx: true,
  ry: true,
  scale: true,
  seed: true,
  shapeRendering: true,
  slope: true,
  spacing: true,
  specularConstant: true,
  specularExponent: true,
  speed: true,
  spreadMethod: true,
  startOffset: true,
  stdDeviation: true,
  stemh: true,
  stemv: true,
  stitchTiles: true,
  stopColor: true,
  stopOpacity: true,
  strikethroughPosition: true,
  strikethroughThickness: true,
  string: true,
  stroke: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeLinecap: true,
  strokeLinejoin: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  surfaceScale: true,
  systemLanguage: true,
  tableValues: true,
  targetX: true,
  targetY: true,
  textAnchor: true,
  textDecoration: true,
  textRendering: true,
  textLength: true,
  to: true,
  transform: true,
  u1: true,
  u2: true,
  underlinePosition: true,
  underlineThickness: true,
  unicode: true,
  unicodeBidi: true,
  unicodeRange: true,
  unitsPerEm: true,
  vAlphabetic: true,
  vHanging: true,
  vIdeographic: true,
  vMathematical: true,
  values: true,
  vectorEffect: true,
  version: true,
  vertAdvY: true,
  vertOriginX: true,
  vertOriginY: true,
  viewBox: true,
  viewTarget: true,
  visibility: true,
  widths: true,
  wordSpacing: true,
  writingMode: true,
  x: true,
  xHeight: true,
  x1: true,
  x2: true,
  xChannelSelector: true,
  xlinkActuate: true,
  xlinkArcrole: true,
  xlinkHref: true,
  xlinkRole: true,
  xlinkShow: true,
  xlinkTitle: true,
  xlinkType: true,
  xmlBase: true,
  xmlns: true,
  xmlnsXlink: true,
  xmlLang: true,
  xmlSpace: true,
  y: true,
  y1: true,
  y2: true,
  yChannelSelector: true,
  z: true,
  zoomAndPan: true,
};

/**
 * # forwardHtmlProps
 *
 * A utility to forward only valid HTML props to the an Element.
 *
 * ## Usage
 *
 * ```
 * import React from 'react';
 * import {forwardHtmlProps} from './forwardHtmlProps.js';
 *
 * const Example = (props) => {
 *   // Ensures that only valid HTML props are sent into the textarea element.
 *   const htmlProps = forwardHtmlProps(props, 'textarea')
 *
 *   return <textarea {...htmlProps} />
 * }
 * ```
 */
export const forwardHtmlProps = (props, Component) => {
  const results = {};
  const isBaseElement = Component && typeof Component === 'string';

  for (const key in props) {
    /**
     * Additional filtering for base HTML elements.
     */
    if (isBaseElement) {
      /**
       * Filtering special non-standard use-cases.
       */
      if (nonStandardProps[key] && !nonStandardProps[key][Component]) continue;
      /**
       * Filtering HitArea  props.
       */
      if (hitAreaProps[key]) continue;
      /**
       * Filtering general disallowed props.
       */
      if (disallowedProps[key]) continue;
      /**
       * Filtering SVG based props for non-SVG elements.
       */
      if (svgProps[key] && !svgElements[Component]) continue;
    }

    if (isPropValid(key)) {
      results[key] = props[key];
    }
  }

  return results;
};
