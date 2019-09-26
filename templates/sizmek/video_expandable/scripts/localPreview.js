var localPreview = false;
try {
	localPreview = document.location === top.location;
}
catch(e) {}

function initializeLocalPreview() {
	var ua = navigator.userAgent;
	EB = {
		_adConfig: {
			adId: 0,
			rnd: 0,
			uid: 0,
			customJSVars: {
				//mdSpeedExpandAnimation: the speed of the animation when the panel is expanding and collapsing
				//Default: "default"
				//Options: "fast", "default", "slow"
				mdSpeedExpandAnimation: "default",
				//mdcbAudioBehavior: Behaviour of the audio
				//Default: 1
				//Options: 1=click to unmute, 2=When Expanded MouseOver to Unmute, 3=On MouseOver to Unmute
				mdcbAudioBehavior: 1,
				//mdcbAutoExp: Behaviour of the autoExpansion
				//Default: 1
				//Options: 1=autoExpansion 1PerDay, 2=autoExpansionAlways, 3=autoExpansion NEVER
				mdcbAutoExp: 1,
				//mdcbCloseBtnPos: Position of the close button on the panel
				//Default:1
				//Options: 1=Left, 2=right
				mdcbCloseBtnPos: 1, // 1=normal; 0=reverse
				mdcbCustomCode: "undefined",
				mdcbCustomStyle: "undefined",
				//mdcbExpDir: It controls the expanding direction  of the panel
				//Default: 3
				//Options: 1-Right-Bottom, 2-Left-Bottom , 3-Auto
				mdcbExpDir: 3,
				//mdcbExpType: It controls the type of expansion, if it should expand after click or after mouse over action.
				//Default: 1
				//Options: 1=onClick, 2=onMouseOver
				mdcbExpType: 1,
				//mdcbVideoLoop: It controls the number of times the video loops in the AD
				//Default: 0
				//Options: 0=none
				mdcbVideoLoop: 0,
				//mdcollapseShowShadow: If true, the collapsed state will have a shadow with CSS
				//Default: true
				mdCollapseShowShadow: true,
				//mdcollapseSwitchElements: This variable switches the social toolbar and the expand button position, if it is set as true.
				//Default: false
				mdCollapseSwitchElements: false,
				//mdcollapseToolbarFullWidth: If true, toolbar will be full width of collapsed ad state.  
				//If false, toolbar will be width of video in collapsed state.
				//Default: true
				mdCollapseToolbarFullWidth: true,
				//The height and width of the video when ad is in the collapsed state. 
				//If you are using the video ratio functionality the value can be 0.
				//Default: 0
				mdCollapseVideoDimHeight: 0,
				mdCollapseVideoDimWidth: 0,
				//It controls the horizontal and vertical position of the video when the format is in the collapsed state.
				//Default: 0
				mdCollapseVideoPositionX: 0,
				mdCollapseVideoPositionY: 0,
				//mdcollapseVideoRatio: maintains the video ratio if it has been set to true and the chosen configuration is not a full video configuration. 
				//The aspect ratio forced to 16:9.
				//Default: true
				mdCollapseVideoRatio: true,
				//mdconfiguration: The social toolbar position, the video position and the expand button position, in both the expanding and the default positions. 
				//Default: "TOP_BOTTOM"  
				//options: TOP_BOTTOM, BOTTOM, TOP You can add at the end "_FULLVIDEO" to get a full video experience
				mdConfiguration: "TOP_BOTTOM",
				//mdconfigurationBgColor: The color of the background or the image of the panel Expanded
				//Default: "image"
				//Options: hexadecimal color, "red", "blue" or you can use "image" to see the expand image when start the animation.
				mdConfigurationBgColor: "image",
				//mdconfigurationControllerColor: The color of the video controllers.
				//Default: "#FFFFFF"
				mdConfigurationControllerColor: "#FFFFFF",
				//mdconfigurationEnableLogo: Controls if the logo of the branded version of the format, should be visible or not.
				//Default: true
				mdConfigurationEnableLogo: true,
				//mdconfigurationProgressbarColor: The color of the progress bar.
				//Default: "#FFFFFF"
				mdConfigurationProgressbarColor: "#FFFFFF",
				//mdconfigurationToolbarColorSet: Which assets to use for the social toolbar elements, 
				//the positive ones(the _ON version of the buttons) or the negative ones (the _OFF version of the buttons)
				//Default: "positive"
				//Options: "positive" or "negative"
				mdConfigurationToolbarColorSet: "positive",
				//The position of the creatives within the panel, according to the panel position in the ad. 
				//Default: 0
				mdDefaultBannerX: 0,
				mdDefaultBannerY: 0,
				//Height and Width in pixels, of the unclipped/expanded panel when user expand the panel
				//Default Width: 728
				//Default Height: 500
				mdExpDimHeight: 500,
				mdExpDimWidth: 728,
				//expToolbarFullWidth: If true, toolbar will be full width of expanded state.  If false, toolbar will be width of video in expanded state.
				//Default: true
				mdExpToolbarFullWidth: true,
				//Height and Width in pixels, of the video when the panel is in the unclipped/expanded state. If you are using the video ratio functionality the value can be 0.
				//Default Height: 281
				//Default Width: 500
				mdExpVideoDimHeight: 281,
				mdExpVideoDimWidth: 500,
				//It controls the horizontal and vertical position of the video when the format is expanded
				//Default: "center"
				mdExpVideoPositionX: "center",
				mdExpVideoPositionY: "center",
				//mdExpVideoRatio:Maintains the video ratio if it has been set to true and the chosen configuration is not a full video configuration. The aspect ratio used is 16:9.
				//Default: false
				mdExpVideoRatio: false,
				//mdAutoCollapseTimer: Seconds to show auto-expanded panel then auto collapse as default
				//Default: 0 (seconds)
				mdAutoCollapseTimer: 0
			},
			svKVPairs: {
				"GLOBAL-facebook-LANDING-url": "none",
				"GLOBAL-twitter-SHARE-url": "none",
				"GLOBAL-twitter-LANDING-url": "none",
				"GLOBAL-youtube-LANDING-url": "none",
				"GLOBAL-pinterest-SHARE-url": "none",
				"GLOBAL-pinterest-LANDING-url": "none",
				"GLOBAL-linkedin-SHARE-url": "none",
				"GLOBAL-linkedin-LANDING-url": "none",
				"GLOBAL-instagram-LANDING-url": "none",
				"GLOBAL-email-SHARE-url": "none"
			}
		},

		getAssetUrl: function(elem,id){
			return elem;
		},
		_sendMessage: function () {
			return;
		},
		API: {
			browser: {
				webkit: ua.match(/webkit/i) !== null,
				firefox: ua.match(/firefox/i) !== null,
				ie: ua.match(/edge/i) !== null,
				ver: ua.match(/firefox/i) !== null,
				chrome: ua.match(/chrome/i) !== null && ua.match(/edge/i) == null
			},
			os: {
				ua: ua,
				ios: ua.match(/ipod|iphone|ipad/i) !== null,
				android: ua.match(/android/i) !== null,
				windowphone: ua.match(/windows phone/i) !== null,
				mobile: ua.match(/ipod|iphone|ipad|android|windows phone/i) !== null
			},
			setStyle: function (obj, styles) {
				for(var style in styles) {
					if(!styles.hasOwnProperty(style)) continue;
					obj.style[style] = styles[style];
				}
			},
			setClass: function (elem, class_name, override) {
				var current_class_name = "";
				if(elem.hasAttribute("class")) {
					current_class_name = elem.getAttribute("class");
					if(current_class_name !== "") {
						var class_names = current_class_name.split(" ");
						for(var i = 0; i < class_names.length; i++) {
							if(class_names[i] === class_name) {
								return;
							}
						}
					}
				}
				if(class_name !== "") {
					current_class_name = current_class_name === "" ? class_name : current_class_name + " " + class_name;
				}
				elem.setAttribute("class", override ? class_name : current_class_name);
			},
			removeClass: function (elem, class_name) {
				var current_class_name = "";
				var new_class_name = "";
				if(elem.hasAttribute("class")) {
					current_class_name = elem.getAttribute("class");
					if(current_class_name !== "") {
						var class_names = current_class_name.split(" ");
						for(var i = 0; i < class_names.length; i++) {
							if(class_names[i] !== class_name) {
								new_class_name += class_names[i] + " ";
							}
						}
					}
				}
				elem.setAttribute("class", new_class_name.replace(/\s$/i, ""));
			},
			getCustomVar: function (name) {
				return EB._adConfig.customJSVars[name];
			},
			getViewPortMetrics: function () {
				return {
					Height: window.innerHeight,
					height: window.innerHeight,
					Width: window.innerWidth,
					width: window.innerWidth
				};
			}
		},
		Comm: {
			setName: function (name) {
				return name;
			},
			isConnected: function (name) {
				return true;
			}
		},
		getSDKData: function () {
			return null;
		},
		expand: function (obj) {
			return true;
		},
		collapse: function (obj) {
			return true;
		},
		setExpandProperties: function () {
			return true;
		},
		clickthrough: function () {
			return true;
		},
		automaticEventCounter: function () {
			return true;
		},
		userActionCounter: function () {
			return true;
		}
	};
	EBG = {
		ActionType: {
			USER: "user",
			AUTO: "auto"
		},
		px: function (n) {
			//console.log(n.toString().match(/^\d$|^\d+$/));
			if(Math.abs(n).toString() !== null) {
				return n + "px";
			}
			return n;
		},
		VideoModule: function (video) {
			return {
				_videoElement: video,
				playVideo: function () {
					this._videoElement.play();
				}
			};
		}
	};

	var visibilityStyle = document.createElement("style");
	visibilityStyle.innerHTML = "html, body, div, video {visibility: visible !important;}";
	document.getElementsByTagName("head")[0].appendChild(visibilityStyle);
}