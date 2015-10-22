var Promise   = require('bluebird');
var fs        = require('fs');
var writeFile = Promise.promisify(fs.writeFile);
var serialize = require('./');
var url       = process.argv[2];
var outfile   = process.argv[3];

serialize(url)
.then(function(data) {
    return writeFile(outfile, data);
})
.catch(function(err) {
    console.error(err);
});
