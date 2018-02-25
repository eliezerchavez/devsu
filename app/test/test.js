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
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../");
let should = chai.should();
let os = require("os");
let sucMsg = new RegExp("Hello Eliezer from " + os.hostname());
let errMsg = /Only valid names are accepted!/;

chai.use(chaiHttp);
//Our parent block
describe("App", () => {
 /*
  * Test the /GET route
  */
  describe("/GET hello/Eliezer", () => {
      it("It should GET: Hello Eliezer from " + os.hostname() + " message", (done) => {
        chai.request(server)
            .get("/hello/Eliezer")
            .end((err, res) => {
                res.should.have.status(200);
		        res.body.should.be.an.instanceOf(Object).and.have.property("message");
	            res.body.message.should.be.a("string");
                res.body.message.should.match(sucMsg);
              done();
            });
      });
  });
  describe("/GET hello/Eliezer1", () => {
    it("It should GET: Only valid names are accepted! message", (done) => {
      chai.request(server)
          .get("/hello/Eliezer1")
          .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an.instanceOf(Object).and.have.property("message");
              res.body.message.should.be.a("string");
              res.body.message.should.match(errMsg);
            done();
          });
    });
});

});