"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bring_updater_1 = require("./bring-updater");
var bring_logger_1 = require("./bring-logger");
/* Magic Mirror
 * Node Helper: bringList
 *
 * By Robert Seidt
 * MIT Licensed.
 */
var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
    // Override socketNotificationReceived method.
    /* socketNotificationReceived(notification, payload)
     * This method is called when a socket notification arrives.
     *
     * argument notification string - The identifier of the noitication.
     * argument payload mixed - The payload of the notification.
     */
    updater: new bring_updater_1.BringUpdater(),
    running: false,
    currentInterval: null,
    intervalTime: 60000,
    logger: null,
    socketNotificationReceived: function (notification, payload) {
        if (notification === "bringList-REGISTER") {
            this.logger = new bring_logger_1.BringLogger(payload);
            this.logger.log("Received registration notification.", true);
            this.updater.register(payload, this.logger);
            this.intervalTime = Math.max(30000, payload.updateInterval);
            this.stopLoop();
            this.ensureLoop();
        }
        if (notification === "bringList-SUSPEND") {
            this.logger.log("Received suspend notification.", true);
            this.updater.unregister(payload);
            if (!this.updater.hasJobs()) {
                this.stopLoop();
            }
        }
    },
    stopLoop: function () {
        if (this.running) {
            this.logger.log("Loop running. Stopping.", true);
            clearInterval(this.currentInterval);
            this.running = false;
            this.currentInterval = null;
        }
    },
    ensureLoop: function () {
        var _this = this;
        if (!this.running) {
            this.logger.log("Loop not running. Starting.", true);
            this.running = true;
            this.updater.refreshLists(function (l) {
                _this.sendSocketNotification("bringList-LISTUPDATE", l);
            });
            this.currentInterval = setInterval(function () {
                _this.updater.refreshLists(function (l) {
                    _this.sendSocketNotification("bringList-LISTUPDATE", l);
                });
            }, this.intervalTime);
        }
    },
    start: function () {
    },
    stop: function () {
        this.stopLoop();
    }
});
