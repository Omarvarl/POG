const saveJSON = require('../saveJSON')

module.exports = function(app) {

    app.post('/', async (req, res) => {
        const result = await saveJSON(req.body)
        res.end(result)
    })
}