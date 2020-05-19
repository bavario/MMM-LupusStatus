/* Magic Mirror
 * Node Helper: MMM-LupusStatus
 *
 * By Mario Obendorfer
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	/**
	 * generate API für Lupusec Action URL's to be called for home automation
	 */
	start: function() {
		var self = this;
		this.expressApp.get("/lupus/security/armed", function(req, res) {
			self.sendSocketNotification("LUPUS_ARMED", {});
			res.send({'success': 'armed'});
		});

		this.expressApp.get("/lupus/security/disarmed", function(req, res) {
			self.sendSocketNotification("LUPUS_DISARMED", {});
			res.send({'success': 'disarmed'});
		});

		this.expressApp.get("/lupus/window/opened", function(req, res) {
			self.sendSocketNotification("LUPUS_WINDOW_OPENED", {});
			res.send({'success': 'opened'});
		});

		this.expressApp.get("/lupus/window/closed", function(req, res) {
			self.sendSocketNotification("LUPUS_WINDOW_CLOSED", {});
			res.send({'success': 'closed'});
		});
	},

	// empty func
	socketNotificationReceived: function() {},
});
