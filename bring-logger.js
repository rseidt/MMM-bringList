"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BringLogger = /** @class */ (function () {
    function BringLogger(config) {
        this.config = config;
    }
    BringLogger.prototype.log = function (message, verbose) {
        if (!verbose || this.config.verboseLogging) {
            console.log("BRING: " + message);
        }
    };
    BringLogger.prototype.logError = function (message) {
        console.error("BRING: " + message);
    };
    return BringLogger;
}());
exports.BringLogger = BringLogger;
