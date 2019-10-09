var localPreview = false;
try {
	localPreview = document.location === top.location;
}
catch (e) {}

function initializeLocalPreview() {
	var ua = navigator.userAgent;
	window.EB = {
		_adConfig: {
			adId: 0,
			rnd: 0,
			uid: 0,
			customJSVars: {
				//This will be a different list for each ad format, these are just example vars.
				//You only need to add the vars that the workspace script(s) may use, not vars that
				//are needed only in the custom script.

				//It's only the list of vars that you need to set to stop getting errors when locally previewing
			}
		},
		_sendMessage: function() {
			return;
		},
		API: {
			browser: {
				webkit: ua.match(/webkit/i) !== null,
				firefox: ua.match(/firefox/i) !== null
			},
			os: {
				ua: ua,
				ios: ua.match(/ipod|iphone|ipad/i) !== null,
				android: ua.match(/android/i) !== null,
				windowphone: ua.match(/windows phone/i) !== null,
				mobile: ua.match(/ipod|iphone|ipad|android|windows phone/i) !== null
			},
			setStyle: function(obj, styles) {
				for (var style in styles) {
					if (!styles.hasOwnProperty(style)) continue;
					obj.style[style] = styles[style];
				}
			},
			setClass: function(elem, class_name, override) {
				var current_class_name = "";
				if (elem.hasAttribute("class")) {
					current_class_name = elem.getAttribute("class");
					if (current_class_name !== "") {
						var class_names = current_class_name.split(" ");
						for (var i = 0; i < class_names.length; i++) {
							if (class_names[i] === class_name) {
								return;
							}
						}
					}
				}
				if (class_name !== "") {
					current_class_name = current_class_name === "" ? class_name : current_class_name + " " + class_name;
				}
				elem.setAttribute("class", override ? class_name : current_class_name);
			},
			removeClass: function(elem, class_name) {
				var current_class_name = "";
				var new_class_name = "";
				if (elem.hasAttribute("class")) {
					current_class_name = elem.getAttribute("class");
					if (current_class_name !== "") {
						var class_names = current_class_name.split(" ");
						for (var i = 0; i < class_names.length; i++) {
							if (class_names[i] !== class_name) {
								new_class_name += class_names[i] + " ";
							}
						}
					}
				}
				elem.setAttribute("class", new_class_name.replace(/\s$/i, ""));
			},
			getCustomVar: function(name) {
				return window.EB._adConfig.customJSVars[name];
			},
			getViewPortMetrics: function() {
				return {
					Height: window.innerHeight,
					height: window.innerHeight,
					Width: window.innerWidth,
					width: window.innerWidth
				};
			}
		},
		Comm: {
			setName: function(name) {
				return name;
			},
			isConnected: function(name) {
				return true;
			}
		},
		getSDKData: function() {
			return null;
		},
		expand: function() {
			return false;
		},
		collapse: function() {
			return false;
		},
		setExpandProperties: function() {
			return true;
		},
		clickthrough: function() {
			return true;
		},
		automaticEventCounter: function() {
			return true;
		},
		userActionCounter: function() {
			return true;
		}
	};
	window.EBG = {
		ActionType: {
			USER: "user",
			AUTO: "auto"
		},
		px: function(n) {
			if (Math.abs(n).toString().match(/^\d$|^\d+$/) !== null) {
				return n + "px";
			}
			return n;
		},
		VideoModule: function(video) {
			return {
				_videoElement: video,
				playVideo: function() {
					this._videoElement.play();
				}
			};
		},
		pm: {
			bind: function() {
				return true;
			}
		}		
	};
	var visibilityStyle = document.createElement("style");
	visibilityStyle.innerHTML = "html, body, div, video {visibility: visible !important;}";
	document.getElementsByTagName("head")[0].appendChild(visibilityStyle);
}