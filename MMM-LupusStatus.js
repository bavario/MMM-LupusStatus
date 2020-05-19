/* global Module */

/* Magic Mirror
 * Module: MMM-LupusStatus
 *
 * By Mario Obendorfer
 */

Module.register("MMM-LupusStatus", {
	defaults: {
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror
	openWindows: 0, // number of windows/doors that are open

	start: function() {
		//open socket connection to node_helper
		this.sendSocketNotification('START', {message: 'start connection'});
	},

	/**
	 * init dom for module
	 */
	getDom: function() {
		const wrapper = document.createElement("div");
		wrapper.classList.add("lupus-container");

		const windowsContainer = document.createElement("div");
		windowsContainer.id = "lupus_windows";
		windowsContainer.classList.add("lupus-windows");

		const securityContainer = document.createElement("div"); 
		securityContainer.id = "lupus_security";
		securityContainer.classList.add("lupus-security");

		wrapper.appendChild(windowsContainer);
		wrapper.appendChild(securityContainer);

		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-LupusStatus.css",
		];
	},

	/**
	 * receive socketNotification from node_helper and alter dom depending on notification
	 * notifications: "LUPUS_ARMED", "LUPUS_DISARMED", "LUPUS_WINDOW_OPENED", "LUPUS_WINDOW_CLOSED"
	 */
	socketNotificationReceived: function (notification) {
		const securityContainer  = document.getElementById("lupus_security");
		const windowContainer = document.getElementById("lupus_windows");
		switch (notification) {
			case "LUPUS_ARMED":
				securityContainer.classList.add("armed");
				securityContainer.classList.remove("disarmed");
				break;
			case "LUPUS_DISARMED":
				securityContainer.classList.add("disarmed");
				securityContainer.classList.remove("armed");
				break;
			case "LUPUS_WINDOW_OPENED":
				this.openWindows++;
				if (this.openWindows === 1) {
					windowContainer.classList.add("opened");
					windowContainer.classList.remove("closed");
				}
				break;
			case "LUPUS_WINDOW_CLOSED":
				this.openWindows--;
				if (this.openWindows === 0) {
					windowContainer.classList.add("closed");
					windowContainer.classList.remove("opened");
				}
				break;
		}
	},
});
