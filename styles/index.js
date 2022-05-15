import React from 'react';
import createEmotion from '@emotion/css/create-instance';
import { forwardHtmlProps } from './forwardHtmlProps';

/**
 * Creating our custom instance of Emotion.
 * This provides us with the core css() function, which is needed for
 * CSS style compiling.
 */
export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({ key: 'css' });

/**
 * A collection of CSS props supported by Styled System.
 * Note: Non-native shortcut props (e.g. `m` or `mx`) are omitted here.
 *
 * @see https://github.com/styled-system/styled-system
 * @see https://gist.github.com/ItsJonQ/5ccaabe1371c8aa94494ce2702ef0833
 */
const openCSSProps = {
  // Background
  background: true,
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  // Border
  border: true,
  borderBottom: true,
  borderBottomColor: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderBottomStyle: true,
  borderBottomWidth: true,
  borderColor: true,
  borderLeft: true,
  borderLeftColor: true,
  borderLeftStyle: true,
  borderLeftWidth: true,
  borderRadius: true,
  borderRight: true,
  borderRightColor: true,
  borderRightStyle: true,
  borderRightWidth: true,
  borderSpacing: true,
  borderStyle: true,
  borderTop: true,
  borderTopColor: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderTopStyle: true,
  borderTopWidth: true,
  borderWidth: true,
  // Color
  backgroundColor: true,
  color: true,
  opacity: true,
  // Flexbox
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
  justifyContent: true,
  justifyItems: true,
  justifySelf: true,
  order: true,
  // Grid
  gridArea: true,
  gridAutoColumns: true,
  gridAutoFlow: true,
  gridAutoRows: true,
  gridColumn: true,
  gridColumnGap: true,
  gridGap: true,
  gridRow: true,
  gridRowGap: true,
  gridTemplateAreas: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  // Layout
  width: true,
  display: true,
  height: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  overflow: true,
  overflowX: true,
  overflowY: true,
  verticalAlign: true,
  // Position
  bottom: true,
  left: true,
  position: true,
  right: true,
  top: true,
  zIndex: true,
  // Shadow
  boxShadow: true,
  textShadow: true,
  // Space
  margin: true,
  marginBottom: true,
  marginLeft: true,
  marginRight: true,
  marginTop: true,
  padding: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,
  // Typography
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  letterSpacing: true,
  lineHeight: true,
  textAlign: true,
  // Other props (Chakra supported)
  animation: true,
  appearance: true,
  boxSizing: true,
  content: true,
  cursor: true,
  fill: true,
  float: true,
  objectFit: true,
  objectPosition: true,
  outline: true,
  overflowWrap: true,
  pointerEvents: true,
  resize: true,
  stroke: true,
  textOverflow: true,
  transform: true,
  transformOrigin: true,
  transition: true,
  userSelect: true,
  visibility: true,
  whiteSpace: true,
};

/**
 * A collection of pseudo props supported by Chakra UI.
 * Note: Non-native selectors (e.g. [data-selected]) are omitted here.
 *
 * @see https://chakra-ui.com/docs/styled-system/features/style-props#pseudo
 * @see https://gist.github.com/ItsJonQ/a55a128ea916da9a131de9d231de4d54
 */
const openPseudoProps = {
  _active: '&:active',
  _activeLink: '&[aria-current=page]',
  _activeStep: '&[aria-current=step]',
  _after: '&:after',
  _autofill: '&:-webkit-autofill',
  _before: '&:before',
  _disabled: '&[disabled]',
  _empty: '&:empty',
  _even: '&:nth-of-type(even)',
  _expanded: '&[aria-expanded=true]',
  _first: '&:first-of-type',
  _focus: '&:focus',
  _focusVisible: '&:focus-visible',
  _focusWithin: '&:focus-within',
  _fullScreen: '&:fullscreen',
  _grabbed: '&[aria-grabbed=true]',
  _groupActive: '[role=group]:active &',
  _groupChecked: '[role=group]:checked &',
  _groupDisabled: '[role=group]:disabled &',
  _groupFocus: '[role=group]:focus &',
  _groupFocusVisible: '[role=group]:focus-visible &',
  _groupFocusWithin: '[role=group]:focus-within &',
  _groupHover: '[role=group]:hover &',
  _groupInvalid: '[role=group]:invalid &',
  _hidden: '&[hidden]',
  _hover: '&:hover',
  _indeterminate: '&:indeterminate, &[aria-checked=mixed]',
  _invalid: '&[aria-invalid=true]',
  _last: '&:last-of-type',
  _loading: '&[aria-busy=true]',
  _ltr: '[dir=ltr] &, &[dir=ltr]',
  _mediaDark: '@media (prefers-color-scheme: dark)',
  _mediaReduceMotion: '@media (prefers-reduced-motion: reduce)',
  _notFirst: '&:not(:first-of-type)',
  _notLast: '&:not(:last-of-type)',
  _odd: '&:nth-of-type(odd)',
  _placeholder: '&::placeholder',
  _placeholderShown: '&:placeholder-shown',
  _pressed: '&[aria-pressed=true]',
  _readOnly: '&[readonly], &[aria-readonly=true]',
  _rtl: '[dir=rtl] &, &[dir=rtl]',
  _selected: '&[aria-selected=true]',
  _selection: '&::selection',
  _valid: '&[aria-valid=true]',
  _visited: '&:visited',
};

/**
 * Filters out potential Styled System CSS props.
 * These CSS props are compiled in a secret __openStyles key.
 */
const getOpenStyleProps = (props) => {
  const stylesToProcess = {};
  const filteredProps = {};

  for (const key in props) {
    const value = props[key];
    if (typeof value !== 'string' && typeof value !== 'number') {
      filteredProps[key] = value;
      continue;
    }
    if (!openCSSProps[key]) {
      filteredProps[key] = value;
      continue;
    }
    stylesToProcess[key] = value;
  }

  filteredProps.__openStyles = css(stylesToProcess);

  return filteredProps;
};

/**
 * Filters out potential Chakra pseudo CSS props.
 * These CSS props are compiled in a secret __openPseudoStyles key.
 */
const getOpenPseudoStyleProps = (props) => {
  const stylesToProcess = [];
  const filteredProps = {};

  for (const key in props) {
    const value = props[key];
    if (!openPseudoProps[key]) {
      filteredProps[key] = value;
      continue;
    }
    const style = {
      [openPseudoProps[key]]: value,
    };
    stylesToProcess.push(css(style));
  }

  filteredProps.__openPseudoStyles = cx(stylesToProcess);

  return filteredProps;
};

const getFilteredProps = (props) => {
  const filteredProps = {};

  for (const key in props) {
    if (shouldForwardProp(key)) {
      filteredProps[key] = props[key];
    }
  }

  return filteredProps;
};

/**
 * Creating a basic styled component function. However, we're
 * only support object styles.
 *
 * Special enhancemenets such as variant style rendering is omitted for this
 * implementation.
 */
export const styled = (Component) => (styles) => {
  /**
   * Compiling initial styled component styles.
   *
   * It's important to do this outside the StyledComponent React component
   * to ensure we only compile once.
   */
  const compiledStyles = css(styles);

  const StyledComponent = React.forwardRef((props, ref) => {
    const {
      as,
      className,
      /**
       * This enables really custom CSS overrides.
       */
      css: __css,
      ...rest
    } = props;
    /**
     * We handle the processing of props slightly differently for base
     * HTML elements (e.g. `div` or `button`).
     *
     * As such, we'll need to check for that.
     */
    const isBaseHTMLElement =
      typeof Component === 'string' || typeof as === 'string';

    // Rendering as
    const BaseComponent = as ? as : Component;
    // Compiling custom css prop styles
    const customStyles = __css ? css(__css) : '';

    /**
     * Processing and filtering out the Styled System CSS Props and Chakra
     * pseudo CSS props.
     *
     * Note: This probably should be combined into a single processing function.
     */
    const { __openStyles, ...filteredProps } = getOpenStyleProps(rest);
    const { __openPseudoStyles, ...finalFilteredProps } =
      getOpenPseudoStyleProps(rest);

    /**
     * Lastly, combine all the classes together. Our custom CSS should
     * have been compiled at this point.
     *
     * It's important to use cx() from Emotion because it honours the rendering
     * order from emotion.
     */
    const classes = cx(
      compiledStyles,
      __openStyles,
      __openPseudoStyles,
      className,
      customStyles
    );
    /**
     * Filter non HTML props for base elements (e.g. `div`).
     */
    const finalProps = isBaseHTMLElement
      ? forwardHtmlProps(finalFilteredProps, BaseComponent)
      : finalFilteredProps;

    /**
     * That's it!
     * Time to render the component.
     */
    return <BaseComponent {...finalProps} className={classes} ref={ref} />;
  });

  /**
   * Setting the display name.
   */
  let displayName = 'Component';
  if (typeof Component === 'string') {
    displayName = Component;
  }
  if (Component.displayName) {
    displayName = Component.displayName;
  }
  // My VSCode is getting confused with string interpolation...
  StyledComponent.displayName = 'Styled(' + displayName + ')';

  /**
   * Done!
   */
  return StyledComponent;
};
