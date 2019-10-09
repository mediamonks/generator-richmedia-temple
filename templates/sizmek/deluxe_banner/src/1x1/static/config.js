define(
{
  "adFormatId": 10366,
  "name": "DeluxeBanner_2_0_0", 
  "defaultBanner": "Main_Banner", 
  "banners": [ 
    {
      "name": "Main_Banner",
      "width": 1,
      "height": 1,
      "defaultImage": "images/default.jpg"
    }
  ],
  "clickThrough": {
    "url": "http://www.sizmek.com/?defaultClickthrough",
    "target": "newWindow",
    "showMenuBar": true,
    "showAddressBar": true,
    "closePanels": true
  },
  "customInteractions": [
    {
      "name": "UserAction",
      "reportingName": "User Action",
      "type": "userAction",
      "includeInRate": true,
      "closePanels": true,
      "landingPageUrl": "http://www.sizmek.com/?userAction",
      "target": "newWindow",
      "showMenuBar": true,
      "showAddressBar": true
    }
  ],
  "variables": [
    {
      "key": "mdAdaptiveBreakpoints",
      "value": "300,600,900,1200"
     },
    {
      "key": "mdAlignment",
      "value": "center"
    },
    {
      "key": "mdAnimateResize",
      "value": "false"
    },
    {
      "key": "mdAspectRatio",
      "value": "undefined"
    },
    {
      "key": "mdAutoHeightThreshold",
      "value": "1"
     },
    {
      "key": "mdAutoRepositionInterval",
      "value": "0"
    },
        {
      "key": "mdBackupImgPath",
      "value": "undefined"
    },
    {
      "key": "mdFixedHeight",
      "value": "0"
    },
    {
      "key": "mdFixedWidth",
      "value": "0"
    },
    {
      "key": "mdHeightDependency",
      "value": "advertiserDiv"
     },
    {
      "key": "mdMaximumHeight",
      "value": "0"
    },
        {
      "key": "mdMaximumWidth",
      "value": "0"
    },
    {
      "key": "mdMinimumHeight",
      "value": "0"
    },
    {
      "key": "mdMinimumWidth",
      "value": "0"
    },
    {
      "key": "mdParentLevelsToResize",
      "value": "0"
     },
    {
      "key": "mdIsDomainConfigEnabled",
      "value": "false"
    },
    {
      "key": "mdProgSettingsFolderPath",
      "value": "//services.serving-sys.com/programmatic/DomainList/"
    },
        {
      "key": "mdResizeBehavior",
      "value": "responsive"
     },
    {
      "key": "mdResizeFriendlyIframe",
      "value": "false"
    },
        {
      "key": "mdWidthDependency",
      "value": "advertiserDiv"
    }
  ]
}
);