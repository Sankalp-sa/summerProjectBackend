"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectToDb = exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
const connectToDb = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log("Error while connecting");
        console.log(error);
    }
};
exports.connectToDb = connectToDb;
const disconnectToDb = async () => {
    try {
        await (0, mongoose_1.disconnect)();
    }
    catch (error) {
        console.log("Error while disconnecting");
        console.log(error);
    }
};
exports.disconnectToDb = disconnectToDb;
//# sourceMappingURL=connection.js.map