const { Router } = require("express");
const getPurchaseIdHandler = require("../handlers/getPurchaseIdHandler");
const getCheckAuth = require("../middlewares/getCheckAuth");
const getPurchaseHandler = require("../handlers/getPurchaseHandler");
const getCheckAdmin = require('../middlewares/getCheckAdmin')

const purchaseRouter = Router();

purchaseRouter.get('/:auth',getCheckAuth, getPurchaseIdHandler)
purchaseRouter.get('/dashboard/:auth', getCheckAdmin, getPurchaseHandler)

module.exports = purchaseRouter;