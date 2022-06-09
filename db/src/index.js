"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const app = (0, express_1.default)();
const port = 8086;
app.use('/', router_1.mainRouter);
app.use('/api', router_1.apiRouter);
app.listen(port, () => console.log(`Running on port ${port}`));
