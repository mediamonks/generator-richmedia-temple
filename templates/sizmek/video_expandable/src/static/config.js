define({
	"adFormatId": 10339,
	"name": "VideoExpandable_2.1.0_300x250",
	"defaultBanner": "Main_Banner",
	"defaultPanel": "expand",
	"banners": [{
		"name": "Main_Banner",
		"width": 300,
		"height": 250,
		"defaultImage": "images/default_image_300x250.jpg"
	}],
	"panels": [{
			"name": "expand",
			"asset": "panels/expand/index.html",
			"width": 0,
			"height": 0,
			"autoExpand": "never",
			"autoCollapse": "never",
			"delayedExpansion": false,
			"positionType": "bannerRelativePixels",
			"x": 0,
			"y": 0
		}
	],
	"clickThrough": {
		"url": "http://www.sizmek.com/?defaultClickthrough",
		"target": "newWindow",
		"showMenuBar": true,
		"showAddressBar": true,
		"closePanels": false
	},
	"customInteractions": [{
			"name": "pua-video",
			"reportingName": "click pua Video",
			"type": "Clickthrough",
			"includeInRate": true,
			"closePanels": false,
			"landingPageUrl": "http://www.sizmek.com/?pua_video",
			"target": "newWindow",
			"showMenuBar": true,
			"showAddressBar": true
		},{
			"name": "pua-companion-expand",
			"reportingName": "click pua companion expand",
			"type": "Clickthrough",
			"includeInRate": true,
			"closePanels": false,
			"landingPageUrl": "http://www.sizmek.com/?pua_companion_expand",
			"target": "newWindow",
			"showMenuBar": true,
			"showAddressBar": true
		},{
			"name": "pua-companion-default",
			"reportingName": "click pua companion default",
			"type": "Clickthrough",
			"includeInRate": true,
			"closePanels": false,
			"landingPageUrl": "http://www.sizmek.com/?pua_companion_default",
			"target": "newWindow",
			"showMenuBar": true,
			"showAddressBar": true
		}		
	],
	"variables": [
		{
			"key": "mdcbAudioBehavior",
			"value": "1"
		},
		{
			"key": "mdcbAutoExp",
			"value": "1"
		},
		{
			"key": "mdcbCloseBtnPos",
			"value": "1"
		},
		{
			"key": "mdcbCustomCode",
			"value": "undefined"
		},
		{
			"key": "mdcbCustomStyle",
			"value": "undefined"
		},
		{
			"key": "mdcbExpDir",
			"value": "3"
		},
		{
			"key": "mdcbExpType",
			"value": "1"
		},
		{
			"key": "mdcbVideoLoop",
			"value": "0"
		},
		{
			"key": "mdcbZIndex",
			"value": "undefined"
		},
		{
			"key": "mdCollapseShowShadow",
			"value": "true"
		},
		{
			"key": "mdCollapseSwitchElements",
			"value": "false"
		},
		{
			"key": "mdCollapseToolbarFullWidth",
			"value": "true"
		},
		{
			"key": "mdCollapseVideoDimHeight",
			"value": "0"
		},
		{
			"key": "mdCollapseVideoDimWidth",
			"value": "0"
		},
		{
			"key": "mdCollapseVideoPositionX",
			"value": "0"
		},
		{
			"key": "mdCollapseVideoPositionY",
			"value": "0"
		},
		{
			"key": "mdCollapseVideoRatio",
			"value": "true"
		},
		{
			"key": "mdConfiguration",
			"value": "TOP_BOTTOM"
		},
		{
			"key": "mdConfigurationBgColor",
			"value": "image"
		},
		{
			"key": "mdConfigurationControllerColor",
			"value": "#FFFFFF"
		},
		{
			"key": "mdConfigurationEnableLogo",
			"value": "true"
		},
		{
			"key": "mdConfigurationProgressbarColor",
			"value": "#FFFFFF"
		},
		{
			"key": "mdConfigurationToolbarColorSet",
			"value": "positive"
		},
		{
			"key": "mdDefaultBannerX",
			"value": "0"
		},
		{
			"key": "mdDefaultBannerY",
			"value": "0"
		},
		{
			"key": "mdExpDimHeight",
			"value": "500"
		},
		{
			"key": "mdExpDimWidth",
			"value": "728"
		},
		{
			"key": "mdExpToolbarFullWidth",
			"value": "true"
		},
		{
			"key": "mdExpVideoDimHeight",
			"value": "281"
		},
		{
			"key": "mdExpVideoDimWidth",
			"value": "500"
		},
		{
			"key": "mdExpVideoPositionX",
			"value": "center"
		},
		{
			"key": "mdExpVideoPositionY",
			"value": "center"
		},
		{
			"key": "mdExpVideoRatio",
			"value": "false"
		},
		{
			"key": "mdSpeedExpandAnimation",
			"value": "default"
		},
		{
			"key": "mdBackupImgPath",
			"value": "undefined"
		},
		{
			"key": "mdParentLevelsToResize",
			"value": "0"
		},
		{
			"key": "mdProgSettingsFolderPath",
			"value": "//services.serving-sys.com/programmatic/DomainList/"
		},
		{
			"key": "mdIsDomainConfigEnabled",
			"value": "false"
		},
		{
			"key": "mdEyeDivZIndex",
			"value": "undefined"
		},
		{
			"key": "mdAutoCollapseTimer",
			"value": "0"
		},
		{
			"key": "mdInteractionsCancelAutoCollapse",
			"value": "false"
		},
		{
			"key": "mdAutoRepositionInterval",
			"value": "0"
		}
	],

	"SV": {
		"svData": [
			{
				"svKey": "GLOBAL-facebook-LANDING-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-twitter-SHARE-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-twitter-LANDING-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-youtube-LANDING-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-pinterest-SHARE-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-pinterest-LANDING-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-linkedin-SHARE-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-linkedin-LANDING-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-instagram-LANDING-url",
				"svType": "string",
				"value": "none"
			},
			{
				"svKey": "GLOBAL-email-SHARE-url",
				"svType": "string",
				"value": "none"
			}
		]
	},
	
	"AdditionalAssets": [
		{
			"OrdinalNumber": 1,
			"FileName": "video.mp4"
		},
		{
			"OrdinalNumber": 2,
			"FileName": "sizmek_poster.png"
		},
		{
			"OrdinalNumber": 3,
			"FileName": "companion_300x250_default.jpg"
		},
		{
			"OrdinalNumber": 4,
			"FileName": "companion_300x250_expand.jpg"
		},
		{
			"OrdinalNumber": 5,
			"FileName": "companion_300x250_loading.jpg"
		},
		{
			"OrdinalNumber": 6,
			"FileName": "logo_positive.svg"
		},
		{
			"OrdinalNumber": 7,
			"FileName": "logo_negative.svg"
		},
		{
			"OrdinalNumber": 8,
			"FileName": "mobile_landscape_960x640.jpg"
		},
		{
			"OrdinalNumber": 9,
			"FileName": "mobile_portrait_640x960.jpg"
		}
	]	
});