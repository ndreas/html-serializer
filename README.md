# HTML Serializer

Node.js library for serializing a HTML page into a self contained document.

The library parses a HTML page and does the following replacements:

 * Replaces `<img src="path/to/image.png">` with `<img src="data:...>"` by
   encoding the image as base64.

## Usage

HTML Serializer uses [Bluebird Promises](https://github.com/petkaantonov/bluebird):

```javascript
    var fs = require('fs');
    var serialize = require('html-serializer');
    var outfile = '/path/to/outfile.html';

    serialize('http://example.com/page.html')
    .then(function(content) {
        fs.writeFile(outfile, content, function(err) {
            if (err) {
                console.error("Failed to serialize HTML");
            } else {
                console.log("HTML serialized!");
            }
        });
    });
```
