const pdf2json = require('pdf2json')
const rdmStr = require('randomstring')
const path = require('path')
const fs = require('fs')

/**
 * Parse a PDF file to json
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const pdfToJsonFields = (req, res, next) => {
  const { pdf } = req.body
  const filePath = path.join(__dirname, `../../public/files/${rdmStr.generate()}.pdf`)
  const pdfParser = new pdf2json()

  fs.writeFile(filePath, pdf, 'base64', (err) => {
    if (err) res.status(500).json(err)
    pdfParser.loadPDF(filePath)
  })

  pdfParser.on("pdfParser_dataError", errData => res.json(errData.parserError))

  pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.unlink(filePath, (err) => {
      console.log(err)
    })
    res.json(pdfParser.getAllFieldsTypes())
  })
}

module.exports = {
  pdfToJsonFields,
}
