# Netflix CTA Component

## Summary

CTA button component with automatic sizing utilities.

First, the component will attempt to use the largest font size possible to fit comfortably within the button, down to the `min-font-size`. If `min-font-size` is too big, the button itself will attempt to grow horizontally to accomodate.

If growing to some `max-width` still doesn't work, the CTA will attempt to put the copy on multiple lines at the original width then at some width between the originally set width and `max-width` if the original width didn't work.

## Interface

### Attributes

* _width_ : Width.
* _height_ : Height.
* _color-1_ : Primary fill color.
  * Default value: `#e50914`
* _color-2_ : Secondary fill/font color.
  * Default value: `#ffffff`
* _font_ : Font family.
* _font-size_: Optional integer. If not specified, the component autosizes the text content to fit in the CTA by default. In GWD, setting the value to 0 is identical as unspecified and triggers font autosize.
* _min-font-size_: Optional integer. Defines the smallest font size the copy can resize to.
  * default value: 8 (px)
* _max-width_: Optional integer. Defines the largest width the button can grow to
  * default value: 140 (px)
  * largest width in which CTA doesn't outshine logo
* _multi-line-height_: Optional integer/string. `line-height` CSS value to apply when CTA using multiple lines
* _no-multiline_: Optional boolean. Prevents any multiline rendering routines.
  * default value: `false`
* _arrow_: Boolean. Determines whether to add an arrow to the CTA
  * default value: `false`
* _border-size_: Number. Sets size of the border in px. Leaving this value blank will remove the border on the CTA.
* _background-image_: Optional image url. Pass in an image url to set the image as the CTA's background.
* _background-image-hover_: Optional image url. Pass in an image url to set the image as the CTA's background on hover.
* _stretch-origin_: Optional string. Similar to the `transform-origin` CSS property, this defines the point from which the CTA stretches
  * options: `left` (default), `right`, `center`
  * or a % string, indicating the relative horizontal point from the left (e.g. `"50%"` to stretch from the center or `"25%"` to stretch from 25% of the CTA width from the left)
* _rtl_ : Right-to-left text, for languages such as Hebrew
* _copy-x-fix_ : horizontal nudge to adjust copy within CTA, in terms of px
  * default value: 0
  * float values are supported since fixes internally use CSS transforms, which support subpixel rendering
* _copy-y-fix_ : vertical nudge to adjust copy within CTA, in terms of px
  * default value: 0
  * also allows float values like _copy-y-fix_
* _arrow-x-fix_ : horizontal nudge to adjust arrow within CTA, in terms of px
  * default value: 0
  * also allows float values like copy fixes
* _arrow-y-fix_ : vertical nudge to adjust arrow within CTA, in terms of px
  * default value: 0
  * also allows float values like copy fixes
* _horizontal-pad_ : Percentage string (e.g. "4%") or Number (for px): defines the copy's horizontal padding
  * default value: "4%"
* _vertical-pad_ : Percentage string or Number (for px): defines the copy's vertical padding
  * default value: "2%"
* _y-fix-on-multiline_ : Determines whether to apply _copy-y-fix_ to copy on multiple lines since that fix is commonly for single line copy
  * default value: `false`
* _data-dynamic-key_ : String. Defines the key to pull from in the `manifest.json`
  * default value: `'CTA'`

### Methods

* _resize(width, height, options)_ : Call this to programmatically set the size of the button.
  * params:
    * _width_ : Number: Defines width in px
    * _height_ : Number: Defines height in px
    * _options_ : Optional Object: Mostly used for internal resize procedures, see below
  * options:
    * _tryingMultiLine_ - Boolean: try putting copy on multiple lines
    * _tryingStretch_ - Boolean: try stretching CTA width
    * _originalWidth_ - Number: first width to try when resizing w/ multiple lines
    * _overrideMaxWidth_ - Boolean, default: `true`: overrides max width with valid passed in "w" value
      * defaults to true to allow devs to get the width they pass in to show up
      * passing in `false` internally to allow resizing routines to work properly
    * _stopRetrying_ - Boolean: discontinue resizing routine. Mostly for debugging purposes
* _mouseover()_ : Call this to programmatically trigger the mouseover animation.
* _mouseout()_ : Call this to programmatically trigger the mouseout animation.
* _text(textContent)_ : Call this to set the CTA text.
* _populateData()_ : Updates internal data object with any changed attributes. Intended to be called after changing attributes which can affect rendering such as `font-size`

### Events

* _cta-click_ : This event is dipatched when a mouse click / tap is triggered on the component.

## How to use

#### GWD

* Import netflix-cta.zip to the `Components` panel in the GWD UI.
* Drag and drop the `Netflix CTA` component anywhere in your creative area. Set its width and height to the size required.
* If the monet component is included in the creative, you must add the CTA ID from the backup.json to the components `Dynamic ID` property to bind the dynamic text property to the component.

### Non-GWD

* Use like any other web component with the interface as specified above.
