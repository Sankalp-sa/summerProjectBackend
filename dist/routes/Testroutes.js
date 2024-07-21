"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testcontroller_1 = require("./../controllers/testcontroller");
// import { updatetest } from './../controllers/testcontroller';
const testcontroller_2 = require("../controllers/testcontroller");
const express_1 = require("express");
const checkAdmin_1 = require("../utils/checkAdmin");
const verifyJWT_1 = require("../utils/verifyJWT");
const Tests = (0, express_1.Router)();
Tests.post("/createTest", verifyJWT_1.verifyToken, checkAdmin_1.isAdmin, testcontroller_2.createtest);
Tests.get("/getTest", testcontroller_2.getTests);
Tests.get("/getSingleTest/:id", testcontroller_2.getSingleTest);
Tests.delete("/deleteTest", testcontroller_2.deletetest);
Tests.put("/updateTest", testcontroller_2.updatetest);
// response related routes
Tests.post("/calculate_score", testcontroller_1.calculatescore);
Tests.get("/getUserTest/:id", testcontroller_1.getUserTests);
Tests.get("/getsorted_students", testcontroller_1.sorted_student);
Tests.post("/startTest", testcontroller_1.startTest);
Tests.get("/getResponse", testcontroller_1.getResponse);
Tests.get("/getSampleTest/:id", testcontroller_1.getSampleTest);
Tests.get("/getTestWithResponse/:id", testcontroller_1.getTestWithResponse);
Tests.get("/getSingleResponse/:id", verifyJWT_1.verifyToken, testcontroller_1.getSingleResponse);
exports.default = Tests;
//# sourceMappingURL=Testroutes.js.map