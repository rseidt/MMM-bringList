"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bring_updater_1 = require("./bring-updater");
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
    socketNotificationReceived: function (notification, payload) {
        if (notification === "bringList-REGISTER") {
            console.log("BRING: Received registration notification.");
            this.updater.register(payload);
            this.stopLoop();
            this.ensureLoop();
        }
        if (notification === "bringList-SUSPEND") {
            console.log("BRING: Received suspend notification.");
            this.updater.unregister(payload);
            if (!this.updater.hasJobs()) {
                this.stopLoop();
            }
        }
    },
    stopLoop: function () {
        if (this.running) {
            console.log("BRING: Loop running. Stopping.");
            clearInterval(this.currentInterval);
            this.running = false;
            this.currentInterval = null;
        }
    },
    ensureLoop: function () {
        var _this = this;
        if (!this.running) {
            console.log("BRING: Loop not running. Starting.");
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
