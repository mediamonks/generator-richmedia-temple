FT.manifest({
  "filename": "index.html",
  "width": <%= manifest_width %>,
  "height": <%= manifest_height %>,
  "clickTagCount": 1,
  "hideBrowsers": ["ie8"],
  "instantAds":[
    {"name":"textVariable", "type":"text", "default":"some default text"}
  ]
});
