const controllers = require('../controllers')
const express = require('express')
const router = express.Router()
const { templates } = controllers

router.post('/templates/pdf-to-json/fields', templates.pdfToJsonFields)

module.exports = router
