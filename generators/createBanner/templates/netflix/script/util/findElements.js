export default function findElements(e, styles, customTypes, sheet) {
  return new Promise(function(resolve) {

    var arr = ["DIV", "SPAN", "IMG", "CANVAS", "SVG", "CIRCLE", "PATH"];
    arr = arr.concat(customTypes)

    if (styles) {
      var obj = {}
      obj.all = [];
      findElement(e, styles, customTypes, sheet);
    } else {
      var obj = [];
      findElement(e);
    }

    function findElement(e, styles, customTypes, sheet) {
      if (e && e.childNodes && e.childNodes.length > 0) {
        for (var i = 0; i < e.childNodes.length; i++) {
          var child = e.childNodes[i];
          if (child.type == "image/svg+xml" || arr.indexOf(child.nodeName.toUpperCase()) != -1) {
            if (child.id || child.className) {
              if (styles) {
                styles = (typeof(styles) == "string") ? [styles] : styles;

                for (var j = 0; j < styles.length; j++) {
                  if (!obj[styles[j]]) {
                    obj[styles[j]] = [];
                  }

                  if (child.id && obj[styles[j]].indexOf(child) == -1) {
                    var val = getStyleRuleValue("." + styles[j], "#" + child.id, sheet);
                    if (val) {
                      obj[styles[j]].push(child);
                    }
                  }
                  var c = (typeof(child.className) == "object") ? String(child.className.baseVal).split(" ") : String(child.className).split(" ");

                  for (var k = 0; k < c.length; k++) {

                    if (c[k] && obj[styles[j]].indexOf(child) == -1) {
                      var val = getStyleRuleValue("." + styles[j], "." + c[k], sheet);
                      if (val) {
                        obj[styles[j]].push(child);
                      }
                    }
                  }
                }
                obj.all.push(child);
                findElement(child, styles, sheet);
              } else {
                obj.push(child);
                findElement(child);
              }
            }
          }
        }
      }
    }

    function getStyleRuleValue(style, selector, sheet) {
      var sheets = [];
      for (var k in document.styleSheets) {
        if (document.styleSheets[k].href && (document.styleSheets[k].href.indexOf("style.css") != -1 || document.styleSheets[k].href.indexOf(sheet) != -1)) {
          sheets.push(document.styleSheets[k]);
        }
      }

      var ar = []
      for (var i = 0, l = sheets.length; i < l; i++) {
        var sheet = sheets[i];
        if (!sheet.cssRules) continue;
        for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
          var rule = sheet.cssRules[j];
          if (rule.selectorText) {
            if (rule.selectorText.indexOf(selector) != -1 && rule.selectorText.indexOf(style) != -1) {
              var all = rule.selectorText.substring(0, rule.selectorText.indexOf(style)).split(".");
              var node = all[all.length - 1];
              return node;
            }
          }
        }
      }
      return;
    }
    resolve(obj);





  });
}
