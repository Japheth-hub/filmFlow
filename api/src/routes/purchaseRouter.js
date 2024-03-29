const { Router } = require("express");
const getPurchaseIdHandler = require("../handlers/getPurchaseIdHandler");
const getCheckAuth = require("../middlewares/getCheckAuth");

const purchaseRouter = Router();

purchaseRouter.get('/:auth',getCheckAuth, getPurchaseIdHandler)

module.exports = purchaseRouter;