const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const folder = './uploads/';
 
const viewFormUpload = fs.readFileSync('./viewUploadForm.html')
 
//Khởi tạo server
http.createServer(function (req, res) {
  if (req.url == '/upload' && req.method == 'POST') {
    const option = {
       
    }
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let oldPath = files.files.path
      let newPath = __dirname + '/uploads/' + files.files.name
      fs.rename(oldPath, newPath, (err) => {
         if (err) return res.end(err)
         return res.end('<h1 style="color: green;">Upload success !</h1>')
      })
    })
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    return res.end(viewFormUpload);
  }
}).listen(3500);