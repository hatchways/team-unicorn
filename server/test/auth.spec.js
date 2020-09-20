const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

// POST /user/create validation
describe("/POST /user/create", () => {
  it("It should return 400", (done) => {
    chai
      .request(app)
      .post("/user/create/")
      .send({
        email: "",
        password: "xyz",
        confirmPassword: "xxz",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        res.body.message.should.contain.keys([
          "name",
          "email",
          "password",
          "confirmPassword",
        ]);
        done();
      });
  });
});

// POST /user/create
describe("/POST /user/create", () => {
  user = {
    name: "John Doe",
    email: "john@email.com",
    password: "password",
    confirmPassword: "password",
  };

  // First time creating
  it("It should return 201", (done) => {
    chai
      .request(app)
      .post("/user/create/")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("user");
        res.body.user.should.contain.keys(["id", "name", "email"]);
        res.body.user.should.not.contain.keys(["password", "confirmPassword"]);
        res.body.user.name.should.equal("John");
        res.body.user.email.should.equal("john@email.com");
        done();
      });
  });

  // Try to re-create
  it("It should return 403", (done) => {
    chai
      .request(app)
      .post("/user/create/")
      .send(user)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property("message");
        done();
      });
  });
});

//TODO: Authenticate tests
