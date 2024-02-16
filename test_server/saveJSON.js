var fs = require('fs')

module.exports = function saveJSON(data) {
    // console.log(JSON.stringify(data))
    fs.writeFileSync('PO.json', JSON.stringify(data))
}

