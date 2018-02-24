process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../");
let should = chai.should();
let os = require("os");
let myReg = new RegExp("Hello Eliezer from " + os.hostname());

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
                res.body.message.should.match(myReg);
              done();
            });
      });
  });
  describe("/GET hello/Eliezer1", () => {
    it("It should GET: Only valid names are accepted! message", (done) => {
      chai.request(server)
          .get("/hello/Eliezer1")
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an.instanceOf(Object).and.have.property("message");
              res.body.message.should.be.a("string");
              res.body.message.should.match(/Only valid names are accepted!/);
            done();
          });
    });
});

});