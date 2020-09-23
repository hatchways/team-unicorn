const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const User = require("../models/User.js");

chai.should();
chai.use(chaiHttp);

const user = {
  name: "John Doe",
  email: "john@email.com",
  password: "password",
  confirmPassword: "password",
};

// !IMPORTANT: This test/routine should be removed before
//             moving on from development stage.
// Clear User collection
const connectDB = require("../config/db");

const dropCollection = async () => {
  await connectDB();
  await User.collection.drop();
};
dropCollection();

describe("User collection", () => {
  it("Should be empty on start", async () => {
    try {
      const count = await User.collection.count();
      chai.expect(count).to.equal(0);
    } catch (err) {
      chai.fail(err.message);
    }
  });
});

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
        res.body.should.have.property("errors");
        res.body.errors.should.contain.keys([
          "name",
          "email",
          "password",
          "confirmPassword",
        ]);
        done();
      });
  });
});

// POST /user/create success/failure
describe("/POST /user/create", () => {
  // First time creating
  it("It should return 201", (done) => {
    chai
      .request(app)
      .post("/user/create/")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("user");
        res.body.user.should.contain.keys(["id", "email", "name"]);
        res.body.user.should.not.contain.keys(["password"]);
        done();
      });
  });

  // Try to re-create
  it("It should return 409", (done) => {
    chai
      .request(app)
      .post("/user/create/")
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property("errors");
        done();
      });
  });
});

// POST /user/authenticate validation
describe("/POST /user/authenticate", () => {
  it("It should return 400", (done) => {
    chai
      .request(app)
      .post("/user/authenticate/")
      .send({
        email: "",
        password: "xyz",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("errors");
        res.body.errors.should.contain.keys(["email"]);
        done();
      });
  });
});

// NOTE: Let's use an agent to retain cookies
//       from authentication and onwards.
const agent = chai.request.agent(app);

// POST /user/authenticate success/failure
describe("/POST /user/authenticate", () => {
  // Email doesn't exist:
  it('It should return "401, Email doesn\'t exist"', (done) => {
    agent
      .post("/user/authenticate/")
      .send({
        email: "aaa@mail.com",
        password: "password",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("errors");
        res.body.errors.should.contain.keys(["DNE_USER"]);

        //TODO: Test this behaviour when implemented.
        // res.should.have.property("header");
        // res.header.should.have.property("www-authenticate");
        // res.header["www-authenticate"].should.be.equal("Basic");
        done();
      });
  });

  // Invalid credentials (i.e. wrong password):
  it('It should return "401, Invalid credentials"', (done) => {
    agent
      .post("/user/authenticate/")
      .send({
        email: user.email,
        password: "wrong" + user.password,
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("errors");
        res.body.errors.should.contain.keys(["INCORRECT_PASSWORD"]);

        //TODO: Test this behaviour when implemented.
        // res.should.have.property("header");
        // res.header.should.have.property("www-authenticate");
        // res.header["www-authenticate"].should.be.equal("Basic");
        done();
      });
  });

  // Successful login should return user and issue jwt
  let returnedUser, returnedJwt;
  it("It should return 200.", (done) => {
    agent
      .post("/user/authenticate/")
      .send({
        email: user.email,
        password: user.password,
      })
      .end((err, res) => {
        res.should.have.status(200);

        res.body.should.have.property("user");
        res.body.user.should.contain.keys(["id", "name", "email"]);
        res.body.user.should.not.contain.keys(["password", "confirmPassword"]);
        returnedUser = res.body.user;

        res.should.have.cookie("auth-token");
        done();
      });
  });

  it("The user info returned should match user", (done) => {
    chai.expect(returnedUser.name).to.equal(user.name);
    chai.expect(returnedUser.email).to.equal(user.email);
    done();
  });

  // it("Issued jwt should be valid and contain correct user info", (done) => {
  //   chai.expect(returnedJwt).to.be.a("string");
  // const decoded = jwt.verify(returnedJwt, keys.jwtSecret);
  // chai.expect(decoded.user.name).to.be.equal(user.name);
  // chai.expect(decoded.user.email).to.be.equal(user.email);
  //   done();
  // });
});

//TODO: Session tests
