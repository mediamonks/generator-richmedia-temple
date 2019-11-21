!(function() {
  var COMPONENT_NAME = 'netflix-cta';
  var PREFIX = 'mm-component';
  var TRANSITION_EASING = '.4s cubic-bezier(0.19, 1, 0.22, 1)';
  // the proportion of padding right of the CTA arrow to the CTA width
  var ARROW_PADDING_TO_WIDTH = 0.04;
  // proportion of copy container to centered context box
  var DEFAULT_ARROW_COPY_TO_CONTENT_RATIO = 0.9;
  // proportion of space between copy and arrow to max content box width
  var DEFAULT_COPY_ARROW_SPACE_RATIO = 0.05;
  var DEFAULT_MULTILINE_COPY_ARROW_SPACE_RATIO = 0.1;
  // list of attributes that affect CTA layout
  var LAYOUT_ATTRIBUTE_LIST = [
    'width',
    'height',
    'font',
    'font-size',
    'min-font-size',
    'max-width',
    'stretch-direction',
    'arrow'
  ];

  function isTruthyAttr(attr) {
    return attr.toString() !== 'false';
  }

  function stretchStrToPercent(stretchStr) {
    if (!stretchStr || stretchStr === 'left') {
      return 0;
    } else if (stretchStr === 'center') {
      return 0.5;
    } else if (stretchStr === 'right') {
      return 1;
    }

    // if it ends with %...
    if (stretchStr.indexOf('%') === stretchStr.length - 1) {
      var stretchPercent = parseFloat(stretchStr);
      // and is valid num...
      if (!isNaN(stretchPercent)) {
        return stretchPercent / 100;
      }
    }
    return 0;
  }

  function parsePaddingAttr(padAttr) {
    if (typeof padAttr === 'number') {
      return padAttr + 'px';
    }

    var parsedNum = parseFloat(padAttr);
    // is number string --> convert to px
    if (!isNaN(parsedNum) && /^(\d|\.)+$/.test(padAttr)) {
      return parsedNum + 'px';
    }
    return padAttr;
  }

  function horizontalPadding(el) {
    var style = window.getComputedStyle(el, null);
    return parseInt(style.getPropertyValue('padding-left'), 10) + parseInt(style.getPropertyValue('padding-right'), 10);
  }

  // Calculate width without padding.
  function innerWidth(el) {
    var style = window.getComputedStyle(el, null);
    var clWidth = el.clientWidth;
    var padLeft = parseInt(style.getPropertyValue('padding-left'), 10);
    var padRight = parseInt(style.getPropertyValue('padding-right'), 10);
    return clWidth - padLeft - padRight;
  }

  // Calculate height without padding.
  function innerHeight(el) {
    var style = window.getComputedStyle(el, null);
    return (
      el.clientHeight -
      parseInt(style.getPropertyValue('padding-top'), 10) -
      parseInt(style.getPropertyValue('padding-bottom'), 10)
    );
  }

  function style(isRTL) {
    // use unique class name as identifier because there are dynamic values in the generated stylesheet
    var UNIQUE_CLASS_NAME = 'uc-' + (Math.random() * 1000000).toFixed(0);

    // determines direction for hover animation
    var ANIM_DIRECTION = isRTL ? 'right' : 'left';

    // prettier-ignore
    Utils.createStyle.call(
      this,
      COMPONENT_NAME + '.' + UNIQUE_CLASS_NAME,
      '.button',
        'will-change: transform;cursor: pointer;overflow: hidden;text-align: center;font-size:' +
          this.data.size +
          'px; font-family: ' +
          this.data.font +
          // setting each padding independently
          // in case, either padding vars are invalid in CSS
          ';padding-top:' +
          this.data.vertPad +
          ';padding-bottom:' +
          this.data.vertPad +
          ';padding-left:' +
          this.data.horizPad +
          ';padding-right:' +
          this.data.horizPad +
          ';',
      '*',
        'box-sizing: border-box;',
      '.button .fill',
        'will-change: transform;width:100%;height:100%;' +
        'transform-origin:top ' + ANIM_DIRECTION + ';' +
        '-webkit-transform-origin:top ' + ANIM_DIRECTION + ';' +
        'transform: scale(0, 1);-webkit-transform: scale(0, 1); transition: transform ' +
          TRANSITION_EASING +
        ';',
      '.button .content',
        'top: 0; left: 0; bottom: 0; right: 0; margin: auto;',
      '.button .content .arrow',
        'will-change: transform;position:absolute;text-align: right;top:50%;left:auto;right:auto;width:100%;font-size:160% !important;-webkit-transform: translate(0%, -50%);transform: translate(0%, -50%);',
      '.button .content .arrow svg',
        'position:absolute;right:0;left:auto;top:0;',
      '.button .content .copy',
        'will-change: transform;transform-origin: 0 0;letter-spacing:1.1px' +
          ';transition: color ' +
          TRANSITION_EASING +
          ';color:' +
          this.data.color[1],
      '.button .border',
        '-webkit-box-sizing: border-box;box-sizing: border-box;position: absolute;top: 0;left: 0;width:100%;height:100%;border:solid ' +
          this.borderSize +
          'px ' +
          this.data.color[0],
      'div',
        'position: absolute;top: 0;left: 0;'
    );

    if (!Utils.isMobile) {
      // prettier-ignore
      Utils.createStyle.call(
        this,
        COMPONENT_NAME + '.' + UNIQUE_CLASS_NAME,
        '.button:hover .bgImageHover',
          'width:100% !important;',
        '.button.hover .bgImageHover',
          'width:100% !important;',
        '.button:hover .fill',
          'transform: scale(1, 1); -webkit-transform: scale(1, 1);',
        '.button.hover .fill',
          'transform: scale(1, 1); -webkit-transform: scale(1, 1);',
        '.button:hover .arrow',
          'color:' + this.data.color[0],
        '.button.hover .arrow',
          'color:' + this.data.color[0],
        '.button:hover .copy',
          'color:' + this.data.color[0],
        '.button.hover .copy',
          'color:' + this.data.color[0],
        '.button.isArrow:hover .copy',
          'color:' + this.data.color[0]
      );
    }

    this.className += ' ' + PREFIX + ' ' + UNIQUE_CLASS_NAME;
    this.style.position = 'absolute';
    this.button.style.backgroundColor = this.data.color[0];
    this.fill.style.backgroundColor = this.data.color[1];
  }

  var CtaComponent = function() {
    var self = Utils.reflectConstruct(HTMLElement, [], this.constructor);

    return self;
  };

  CtaComponent.prototype = Object.create(HTMLElement.prototype, {
    disconnectedCallback: {
      value: function() {
        this._attached = false;
      }
    },
    populateData: {
      value: function() {
        this.data = {};
        this.data.color = [this.getAttribute('color-1') || '#e50914', this.getAttribute('color-2') || '#ffffff'];
        this.data.size = parseInt(this.getAttribute('font-size'), 10) || 12;
        this.data.minSize = parseInt(this.getAttribute('min-font-size'), 10) || 8;
        this.data.font = (this.getAttribute('font') || 'Netflix Sans') + ', Arial, sans-serif';
        this.data.text = this.getAttribute('text');
        this.data.multiLineHeight = this.getAttribute('multi-line-height');
        this.data.horizPad = parsePaddingAttr(this.getAttribute('horizontal-pad')) || '5%';
        this.data.vertPad = parsePaddingAttr(this.getAttribute('vertical-pad')) || '3%';
        this.data.arrowCopyContentRatio = DEFAULT_ARROW_COPY_TO_CONTENT_RATIO;
        this.data.copyArrowSpaceRatio = DEFAULT_COPY_ARROW_SPACE_RATIO;
        this.data.multilineCopyArrowSpaceRatio = DEFAULT_MULTILINE_COPY_ARROW_SPACE_RATIO;
      }
    },
    connectedCallback: {
      value: function() {
        console.log('ctaCompontn.connectedCallback');

        this._attached = false;
        this._hasInited = false;
        this._resizeQueued = false;
        this.button = document.createElement('div');
        this.button.className = 'button';
        this.fill = document.createElement('div');
        this.fill.className = 'fill';
        this.content = document.createElement('div');
        this.content.className = 'content';
        this.copy = document.createElement('div');
        this.copy.className = 'copy';
        this.arrow = document.createElement('div');
        this.arrow.className = 'arrow';
        this.border = document.createElement('div');
        this.border.className = 'border';

        this._attached = true;

        if (this._hasInited) {
          if (this._resizeQueued) {
            this.resize();
          }
          return;
        }

        this._hasInited = true;
        this.populateData();

        var bgImg = this.getAttribute('background-image');
        if (bgImg) {
          this.bgImgContainer = document.createElement('div');
          this.bgImgContainer.className = 'bgImage';
          var img = new Image();
          img.src = bgImg;
          this.bgImgContainer.appendChild(img);
          this.button.appendChild(this.bgImgContainer);
          this.bgImgContainer.setAttribute('style', 'position: absolute; top:0;left:0;');
        }

        this.appendChild(this.button);
        this.button.appendChild(this.fill);

        var bgImgHover = this.getAttribute('background-image-hover');
        if (bgImgHover) {
          this.bgImgContainerHover = document.createElement('div');
          this.bgImgContainerHover.className = 'bgImageHover';
          var imgHover = new Image();
          imgHover.src = bgImgHover;
          this.bgImgContainerHover.appendChild(imgHover);
          this.button.appendChild(this.bgImgContainerHover);
          this.bgImgContainerHover.setAttribute(
            'style',
            'position: absolute; top:0;left:0;width:0%;overflow:hidden;height:' +
              this.height +
              'px; transition: width ' +
              TRANSITION_EASING +
              ';'
          );
          this.fill.setAttribute('style', 'display:none;');
        }

        this.button.appendChild(this.content);
        this.content.appendChild(this.copy);
        this.hasArrow = this._hasTruthyAttribute('arrow');
        this.rtl = this._hasTruthyAttribute('rtl');
        this.hasBorder = this.hasAttribute('border-size');
        this.borderSize = this.getAttribute('border-size') || 1;

        if (this.hasArrow) {
          this.content.appendChild(this.arrow);
          this.button.className += ' isArrow';
        }

        if (this.hasBorder) {
          this.button.appendChild(this.border);
        }

        style.call(this, this.rtl);

        this.button.addEventListener(
          'click',
          function() {
            if (this.click) this.click();
            var c = document.createEvent('CustomEvent');
            c.initCustomEvent('cta-click', !0, !0, 'Netflix CTA Click');
            this.dispatchEvent(c);
          }.bind(this)
        );

        // necessary to get the arrow to change color properly
        this.button.addEventListener(
          'mouseover',
          function(event) {
            this.mouseover.call(this);
          }.bind(this)
        );

        this.button.addEventListener(
          'mouseout',
          function(event) {
            this.mouseout.call(this);
          }.bind(this)
        );

        var cta = 'WATCH NOW';

        if (this.data.text !== null) {
          cta = this.data.text;
        }

        var MonetComponent = document.querySelector('monet-integrator');
        var FontsComponent = (this.fontsComponent = this.fontsComponent || document.querySelector('netflix-fonts'));

        var ensureFontsReady = function() {
          var readyCheckPromise = new Promise(function(resolve) {
            if (!FontsComponent || FontsComponent.hasAttribute('ready')) {
              resolve();
            } else {
              FontsComponent.addEventListener('ready', resolve);
            }
          });
          var timeoutPromise = new Promise(function(resolve) {
            setTimeout(3000, resolve);
          });
          return Promise.race([readyCheckPromise, timeoutPromise]);
        };

        if (MonetComponent) {
          MonetComponent.register(this);
          ensureFontsReady()
            .then(function() {
              return MonetComponent.getMonetData();
            })
            .then(
              function(data) {
                var key = this.getAttribute('data-dynamic-key') || 'CTA';
                var d = key;
                if (d.split('.').length === 1) {
                  d = 'rootAssets["text.' + d + '"].text';
                }
                try {
                  cta = eval('data.' + d);
                  var locale = Monet.getComponentLocale('text.' + key).substr(0, 2);
                  this.locale = locale || this.locale;
                  this.copy.classList.add(locale);
                  if (locale == 'ar' || locale == 'he') {
                    this.setAttribute('rtl', true);
                  }
                  this.text(cta);
                  this.dispatchEvent(new CustomEvent('ready'));
                } catch (e) {
                  Monet.logEvent('MONET_DATA_ERROR', {
                    details: 'Netflix CTA Component error; Could not find data in rootAssets: ' + 'text.' + d,
                    stack: e
                  });

                  MonetComponent.getBackupMonetData().then(
                    function(backupData) {
                      var ld = d;
                      if (d.split('.').length === 1) {
                        d = 'rootAssets["text.' + d + '"].text';
                      }
                      cta = eval('backupData.' + d);
                      var locale = Monet.getComponentLocale('text.' + key).substr(0, 2);
                      this.locale = locale || this.locale;
                      this.copy.classList.add(locale);
                      if (locale == 'ar' || locale == 'he') {
                        this.setAttribute('rtl', true);
                      }
                      this.text(cta);

                      this.dispatchEvent(new CustomEvent('ready'));
                    }.bind(this),
                    function(error) {
                      Monet.logEvent('MONET_DATA_ERROR', {
                        details: 'Failed to load backup Monet data',
                        stack: error
                      });
                    }
                  );
                }
              }.bind(this),
              function(error) {
                Monet.logEvent('MONET_DATA_ERROR', {
                  details: 'Failed to load backup Monet data',
                  stack: error
                });
              }
            );
        } else {
          this.text(cta);
        }
      },
      enumerable: true
    },

    text: {
      value: function(text) {
        var copyText = text || this.copy.innerHTML;
        this.copy.innerHTML = copyText;
        this.resize();
      }
    },

    _hasTruthyAttribute: {
      value: function(attrName) {
        if (this.hasAttribute(attrName)) {
          var attr = this.getAttribute(attrName);
          return isTruthyAttr(attr);
        }
        return false;
      }
    },

    // special case for Hebrew font (Noto Sans Hebrew)
    // doesn't have Latin glyphs so using vertical line glyph available to estimate metrics
    _measureHebrewInlineSpaces: {
      value: function(measurer, text) {
        measurer.renderText('\u05c0');
        var hebrewTop = measurer.calcTopY();
        var hebrewBtm = measurer.calcBottomY();

        measurer.renderText(text);

        return {
          top: measurer.calcTopY() - hebrewTop,
          bottom: hebrewBtm - measurer.calcBottomY()
        };
      }
    },

    _getLocaleFont: {
      value: function() {
        this.fontsComponent = this.fontsComponent || document.querySelector('netflix-fonts');

        if (!this.localeFont) {
          // get first valid FontFaceObserver result object
          var fontLoads = this.fontsComponent && this.fontsComponent.fontLoads;
          var localeFonts =
            fontLoads && (fontLoads[this.locale] && fontLoads[this.locale].length ? fontLoads[this.locale] : fontLoads['en']);
          this.localeFont =
            localeFonts &&
            (function getLocaleFont(localeFonts, i) {
              if (i >= localeFonts.length) return null;
              return localeFonts[i] || getLocaleFont(localeFonts, i + 1);
            })(localeFonts, 0);
        }
        return this.localeFont;
      }
    },

    _measureInlineSpaces: {
      value: function() {
        var localeFont = this._getLocaleFont();
        var measurer =
          this.measurer ||
          (localeFont &&
            new TextMeasurer({
              fontFamily: localeFont.family,
              fontSize: this._renderedFontSize || this.data.size,
              fontWeight: localeFont.weight,
              _bgColor: 'rgb(162,125,156)',
              _textColor: 'white'
            }));

        var inlineSpaces = {
          top: 1,
          bottom: 1
        };

        if (measurer) {
          // attach measurer to component instance
          this.measurer = measurer;

          // update measurer with any possible font changes
          measurer.updateFont({
            fontFamily: localeFont.family,
            fontSize: this._renderedFontSize || this.data.size,
            fontWeight: localeFont.weight
          });

          // save text
          var text = this.copy.innerText;

          if (localeFont.family === 'Noto Sans Hebrew') {
            return this._measureHebrewInlineSpaces(measurer, text);
          }

          measurer.renderText('ˆ');
          var circumflexTop = measurer.calcTopY();
          var circumflexBtm = measurer.calcBottomY();

          measurer.renderText('S');
          var baseline = measurer.calcBottomY();
          var capHt = measurer.calcTopY();

          measurer.renderText('p');
          var descent = measurer.calcBottomY() - baseline;

          measurer.renderText(text);

          var inlineHtAboveCap;
          if (localeFont.family === 'Netflix Sans' || localeFont.family === 'Neue Helvetica Arab') {
            var circumflexHt = circumflexBtm - circumflexTop;
            inlineHtAboveCap = circumflexHt * 2;
          } else {
            inlineHtAboveCap = capHt - circumflexTop;
          }
          var inlineTop = measurer.calcTopY() - capHt + inlineHtAboveCap;
          var inlineBtm = descent;

          inlineSpaces.top = inlineTop;
          inlineSpaces.bottom = inlineBtm;
        }

        return inlineSpaces;
      }
    },

    // measuring margins from inline vs block rendering
    // subtracting difference of span and this.copy heights from bottom margin
    // since the block-rendered span is aligned top with this.copy
    // so the bottom margin is lessened if this.copy cuts off the span's height
    _measureBlockSpaces: {
      value: function() {
        var span = this.copy.querySelector('span');

        var prevDisplay = span.style.display;
        var prevPosition = span.style.position;

        span.style.position = 'static';
        var blockRenderedSpanRect = span.getBoundingClientRect();

        span.style.display = 'inline';
        var inlineRenderedSpanRect = span.getBoundingClientRect();

        span.style.display = prevDisplay;
        span.style.position = prevPosition;

        var spanHeight = span.offsetHeight;
        var copyHeight = this.copy.offsetHeight;

        return {
          top: Math.abs(blockRenderedSpanRect.top - inlineRenderedSpanRect.top),
          bottom: Math.abs(blockRenderedSpanRect.bottom - inlineRenderedSpanRect.bottom)
        };
      }
    },

    // utility for determining whether or not to use canvas to improve text alignment
    _preventMeasuringAlignFix: {
      value: function() {
        if (this._multiLine) return true;

        var localeFont = this._getLocaleFont();
        // skipping Netflix Sans since renders pretty aligned
        var isNetflixFont = localeFont && localeFont.family === 'Netflix Sans';
        return (this.locale === 'th' && this._renderedFontSize >= 10) || isNetflixFont;
      }
    },

    // method using canvas to render text and measure center of text
    _measureCenterFix: {
      value: function() {
        // don't do for multiline since canvas not rendering with wrapped text
        // or for certain locale text over some font size
        if (this._preventMeasuringAlignFix()) return 0;

        /* 
				1. Measure inline top and bottom margins
				2. Measure block top and bottom margins
				3. Measure top, bottom and center (whether abs or of mass) of text selection
				4. Fix = (total top margin - total bottom margin) / 2
				*/
        var inlineSpaces = this._measureInlineSpaces();
        var blockSpaces = this._measureBlockSpaces();

        var totalTop = inlineSpaces.top + blockSpaces.top;
        var totalBottom = inlineSpaces.bottom + blockSpaces.bottom;

        return (totalBottom - totalTop) / 2;
      }
    },

    _applyContentFixes: {
      value: function() {
        // copy fixes
        var copyXFix = this.getAttribute('copy-x-fix');
        var copyYFix = this.getAttribute('copy-y-fix');
        var parsedCopyXFix = parseFloat(copyXFix);
        var parsedCopyYFix = parseFloat(copyYFix);

        // whether to apply copy-y-fix to copy on multiple lines
        var copyYFixOnMultiLine = this._hasTruthyAttribute('y-fix-on-multiLine');
        // if no explicit copy y fix provided, get a corrected vertical margin
        // computed by margin: auto and use the corrected value instead for vertical alignment
        var yFixToUse = !isNaN(parsedCopyYFix) ? parsedCopyYFix : this._measureCenterFix();

        if (parsedCopyXFix || yFixToUse) {
          TweenMax.set(this.copy, {
            x: !isNaN(parsedCopyXFix) ? parsedCopyXFix : 0,
            y: !isNaN(yFixToUse) && (!this._multiLine || copyYFixOnMultiLine) ? yFixToUse : 0
          });
        }

        // arrow fixes
        if (this.hasArrow) {
          var arrowXFix = this.getAttribute('arrow-x-fix');
          var arrowYFix = this.getAttribute('arrow-y-fix');
          var parsedArrowXFix = parseFloat(arrowXFix);
          var parsedArrowYFix = parseFloat(arrowYFix);

          if (parsedArrowXFix || parsedArrowYFix) {
            TweenMax.set(this.arrow, {
              x: arrowXFix ? parsedArrowXFix : 0,
              y: arrowYFix && (!this._multiLine || arrowYFixOnMultiLine) ? parsedArrowYFix : 0
            });
          }
        }
      }
    },

    _clampContents: {
      value: function(spanWidth, maxContentWidth, arrowHeight) {
        // extra resizing steps to ensure copy and arrow are equally spaced
        // if CTA has an arrow
        if (this.hasArrow) {
          var arrowSpaceRatio = this._multiLine ? this.data.multilineCopyArrowSpaceRatio : this.data.copyArrowSpaceRatio;
          var arrowWidth = arrowHeight / 2 + 2;
          var arrowAllowance = arrowSpaceRatio * maxContentWidth + arrowWidth;
          var newContentWidth = spanWidth + arrowAllowance;

          this.copy.style.width = spanWidth + 'px';
          this.content.style.width = newContentWidth + 'px';
        }
      }
    },

    resize: {
      value: function(w, h, options) {
        /* 
				Resize options:
				- tryingMultiLine - try putting copy on multiple lines
				- tryingStretch - try stretching CTA width
				- originalWidth - first width to try when resizing w/ multiple lines
				- overrideMaxWidth - overrides max width with valid passed in "w" value
				  - defaults to true, to allow devs to get the width they pass in to show up
				  - passing in false internally to allow resizing routines to work properly
				- stopRetrying - discontinue resizing routine. Mostly for debugging purposes
				*/
        options = options || {};

        if (options.overrideMaxWidth === undefined) {
          options.overrideMaxWidth = true;
        }

        if (options.overrideMaxWidth && w) {
          this.setAttribute('width', w);
          this.setAttribute('max-width', w);
        }

        // update multiLine status
        this._multiLine = !!options.tryingMultiLine;

        // queue resize when the element is back in the dom
        if (!this._attached) {
          this._resizeQueued = true;
          return;
        }

        this._resizeQueued = false;
        this.rtl = this._hasTruthyAttribute('rtl');

        if (this.rtl) {
          TweenMax.set(this.copy, {
            css: {
              right: 0,
              left: 'auto'
            }
          });
          this.arrow.setAttribute(
            'style',
            'position:absolute;text-align: left;top:50%;left:auto;right:auto;width:100%;font-size:160% !important;-webkit-transform: scale(-1,1) translate(0%, -50%);transform: scale(-1,1) translate(0%, -50%);'
          );
        } else {
          TweenMax.set(this.copy, {
            css: {
              right: 'auto',
              left: 0
            }
          });
          this.arrow.setAttribute(
            'style',
            'position:absolute;text-align: right;top:50%;left:auto;right:auto;width:100%;font-size:160% !important;-webkit-transform: translate(0%, -50%);transform: translate(0%, -50%);'
          );
        }

        var parsedWidth = parseInt(this.getAttribute('width'), 10);
        var maxWidth = parseInt(this.getAttribute('max-width'), 10) || 140;

        parsedWidth = isNaN(parsedWidth) ? null : parsedWidth;

        // taking minimum of width and max-width in case someone puts lower max width then width
        var width = w || parsedWidth || (this.offsetWidth || 109);
        var height = h || (this.getAttribute('height') || (this.offsetHeight || 28));
        width = Math.min(width, maxWidth);

        this.button.style.width = this.style.width = width + 'px';
        this.button.style.height = this.style.height = height + 'px';

        var maxContentWidth = innerWidth(this.button);
        var contentHeight = innerHeight(this.button);
        var copyToContentRatio = this.hasArrow ? this.data.arrowCopyContentRatio : 1;
        var copyWidth = copyToContentRatio * maxContentWidth;

        this.content.style.width = maxContentWidth + 'px';
        this.copy.style.width = copyWidth + 'px';
        this.content.style.height = this.copy.style.height = contentHeight + 'px';

        this.copy.style.whiteSpace = options.tryingMultiLine ? 'normal' : 'nowrap';

        this.width = width;
        this.height = height;

        Utils.textFit(this.copy, {
          detectMultiLine: true,
          multiLine: options.tryingMultiLine,
          alignHoriz: true,
          alignVert: true,
          minFontSize: this.data.minSize,
          maxFontSize: this.data.size
        });

        var noMultiline = this._hasTruthyAttribute('no-multiline');
        var span = this.copy.querySelector('span');

        if (options.tryingMultiLine && this.data.multiLineHeight) {
          span.style.lineHeight = this.data.multiLineHeight;
        }

        // temporarily allow span to wrap around text
        var prevPosition = span.style.position;
        var prevDisplay = span.style.display;
        span.style.position = 'static';
        span.style.display = 'inline';
        var spanWidth = span.offsetWidth;
        var inlineSpanHeight = span.offsetHeight;

        // then remove element styling
        span.style.position = prevPosition;
        span.style.display = prevDisplay;

        var fontSize = (this._renderedFontSize = parseInt(getComputedStyle(span).fontSize));

        var arrowHeight, arrowWidth;
        if (this._attached) {
          this.arrow.innerHTML = '';

          // createArrow
          var arrowToFontSizeRatio = options.tryingMultiLine ? 0.9 : 0.65;
          arrowHeight = Math.round(parseInt(fontSize) * arrowToFontSizeRatio);
          TweenMax.set(this.arrow, {
            height: arrowHeight
          });
          var strokeWidth = 2;
          var elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

          arrowWidth = arrowHeight / 2 + strokeWidth;
          elem.setAttribute('width', arrowWidth + 'px');
          elem.setAttribute('height', arrowHeight + 1 + 'px');
          elem.line = new Utils.SvgIcon(
            'line1',
            'M0,0 l' + arrowHeight / 2 + ',' + arrowHeight / 2 + 'l-' + arrowHeight / 2 + ',' + arrowHeight / 2
          );
          elem.line.setAttribute('fill', 'none');
          elem.line.setAttribute('stroke', this.data.color[1] || 0);
          elem.line.setAttribute('stroke-width', strokeWidth);
          elem.appendChild(elem.line);

          this.arrow.appendChild(elem);
        }

        if (
          options.stopRetrying ||
          (options.tryingStretch && options.tryingMultiLine) ||
          // trying stretch without multiline is the step before multiline rendering
          // if 'no-multiline' is set, stop resizing here
          (options.tryingStretch && !options.tryingMultiLine && noMultiline)
        ) {
          this._applyContentFixes();
          this._clampContents(spanWidth, maxContentWidth, arrowHeight);
          return;
        }

        var spanHeight = span.offsetHeight;
        var copyContainerWidth = this.copy.offsetWidth;
        var copyContainerHeight = this.copy.offsetHeight;
        var copyExcessWidth = spanWidth - copyContainerWidth;
        var copyExcessHeight = inlineSpanHeight - copyContainerHeight;

        // if copy bleeds beyond container
        // also implies copy is at minimum font size since textFit utility will try
        // to use min font size to try fitting copy to CTA
        if (copyExcessWidth > 0 || copyExcessHeight > 0) {
          // was initially not trying a stretch this run of resize
          // so will try to stretch in the next resize call
          if (!options.tryingStretch) {
            var potentialNewWidth;
            var horizPadIsPercent = this.data.horizPad.indexOf('%') >= 0;
            if (horizPadIsPercent) {
              var horizPadPercent = parseFloat(this.data.horizPad) / 100;
              potentialNewWidth = (copyContainerWidth + copyExcessWidth) * (1 + 2 * horizPadPercent) / copyToContentRatio + 1;
            } else {
              // assume using flat px as padding value
              var horizPadVal = parseFloat(this.data.horizPad);
              potentialNewWidth = (copyContainerWidth + copyExcessWidth) / copyToContentRatio + 2 * horizPadVal + 1;
            }

            // if CTA height being exceeded,
            // just set newWidth to maxWidth
            // since can't get the exact ideal width
            // to accomodate multiline copy
            var newWidth = copyExcessHeight > 0 ? maxWidth : Math.min(maxWidth, potentialNewWidth);
            var extraWidth = newWidth - width;

            this.resize(newWidth, h || null, {
              overrideMaxWidth: false,
              originalWidth: width,
              tryingStretch: true,
              tryingMultiLine: options.tryingMultiLine
            });

            // default behavior: stretches from left
            var stretchOrigin = this.getAttribute('stretch-origin');
            var percentOrigin = stretchStrToPercent(stretchOrigin);

            if (percentOrigin > 0) {
              TweenMax.set(this, {
                x: '-=' + extraWidth * percentOrigin
              });
            }
          } else if (!options.tryingMultiLine) {
            this.resize(options.originalWidth, h || null, {
              overrideMaxWidth: false,
              originalWidth: options.originalWidth,
              tryingStretch: false,
              tryingMultiLine: true
            });
          }
        } else {
          this._applyContentFixes();
          this._clampContents(spanWidth, maxContentWidth, arrowHeight);
        }
      }
    },

    mouseover: {
      value: function() {
        if (!Utils.isMobile) {
          this.button.classList.add('hover');
        }
        this.arrow.querySelector('svg').line.setAttribute('stroke', this.data.color[0]);
      }
    },

    mouseout: {
      value: function() {
        if (!Utils.isMobile) {
          this.button.classList.remove('hover');
        }
        this.arrow.querySelector('svg').line.setAttribute('stroke', this.data.color[1]);
      }
    },

    preview: {
      value: function() {
        this.setAttribute('arrow', '');
        this.setAttribute('border-size', '');
        this.setAttribute('size', 12);
      }
    }
  });

  CtaComponent.prototype.constructor = CtaComponent;
  Object.setPrototypeOf(CtaComponent, HTMLElement);

  CtaComponent.observedAttributes = LAYOUT_ATTRIBUTE_LIST;
  if (!customElements.get(COMPONENT_NAME)) {
    customElements.define(COMPONENT_NAME, CtaComponent);
  }
})();
