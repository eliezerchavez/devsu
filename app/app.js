/*!
 * Copyright (c) 2018 Eliezer Chavez <eliezer.chavez@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var express = require("express")
  , bodyParser = require('body-parser')
  , app = express()
  , os = require("os")
  , validator = require("validator");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/hello/:name", function(req, res) {

  if (validator.isAlpha(req.params.name, 'es-ES'))
    res.send({"message":"Hello " + req.params.name + " from " + os.hostname()});
  else 
    res.send({"message":"Only valid names are accepted!"});

})

//don't start server when running from mocha

if(process.mainModule.filename.indexOf("node_modules/mocha/bin/_mocha")==-1)
{
  app.listen(8002);
  console.log("Application is listening in port 8002.")
}


module.exports = app