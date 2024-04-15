const { Router } = require("express");
const getPurchaseIdHandler = require("../handlers/getPurchaseIdHandler");
const getCheckAuth = require("../middlewares/getCheckAuth");
const getPurchaseHandler = require("../handlers/getPurchaseHandler");
const checkAdmin = require("../middlewares/checkAdmin");

const purchaseRouter = Router();

purchaseRouter.get('/:auth',getCheckAuth, getPurchaseIdHandler)
purchaseRouter.get('/dashboard/:auth', checkAdmin, getPurchaseHandler)

module.exports = purchaseRouter;