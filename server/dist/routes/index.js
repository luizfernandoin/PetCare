"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const pet_1 = __importDefault(require("./pet"));
const clinica_1 = __importDefault(require("./clinica"));
const service_1 = __importDefault(require("./service"));
const router = (0, express_1.Router)();
router.use(users_1.default);
router.use(pet_1.default);
router.use(clinica_1.default);
router.use(service_1.default);
exports.default = router;
