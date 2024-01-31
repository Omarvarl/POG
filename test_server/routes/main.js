const PDF = require('../makePDF')

module.exports = function(app) {

    app.post('/', async (req, res) => {
        const result = await PDF(req.body)
        res.end(result)
    })
}