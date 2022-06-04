//requre buid in modules
const http = require('http'); //common Module pattern (CJS)
const fs = require('fs');
const mime = require('mime-types');

let lookup = mime.lookup; //alias for mime.lookup

const port = 3000;

const server = http.createServer(function(req, res)
{
    let path =req.url; // alias for req.url

    if (path == "/" || path == "/home") 
    {
        path = "/index.html";
    }

    let mine_type = lookup(path.substring(1));
    console.log(`MIME TYPE: ${mine_type}`);


   // fs.readFile(` __dirname: ${__dirname}`);
   fs.readFile(__dirname + path, function(err, data)
   {
       if(err)
       {
           res.writeHead(404); //status -file not found
           return res.end("ERROE: 404 - File Not Found"); //output the error message to the page
       }
       // no err
       res.setHeader("X-Content-Type-Options" , "nosniff"); // security guard
       res.writeHead(200, {'Content-Type': mine_type}); // status all ok
       return res.end(data); //output the file that was read to the page

   });

});

 server.listen(port, function()
 {
     console.log(`server running at port: ${port}`);

 });