const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("Test register and login routes", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
});

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
});

  test("test register route", async () => {
    const mockRegisterData = {
      email: "test@me.com",
      password: "321336",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(mockRegisterData);

    expect(res.statusCode).toBe(201);

    expect(res.body.email).toBe(mockRegisterData.email);
    expect(typeof res.body.email).toBe("string");

    expect(res.body.subscription).toBeDefined();
    expect(typeof res.body.subscription).toBe("string");

    expect(res.body.avatarURL).toBeDefined();
    expect(typeof res.body.avatarURL).toBe("string")

    const user = await User.findOne({ email: mockRegisterData.email });
    expect(user.email).toBe(mockRegisterData.email);
  });

  test("test login route", async () => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("321336", salt);

    const mockNewUser = {
      email: "test@me.com",
      password: hashPassword,
      avatarURL: "mocked_avatar_url",
    };

    const user = await User.create(mockNewUser);

    const loginUser = {
      email: "test@me.com",
      password: "321336",
    };

    const res = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    expect(res.statusCode).toBe(200);

    expect(res.body.token).toBeTruthy();
    const {token} = await User.findById(user._id);
    expect(res.body.token).toBe(token);

    expect(res.body.user.email).toBe(mockNewUser.email);
    expect(typeof res.body.user.email).toBe("string");

    expect(res.body.user.subscription).toBeDefined();
    expect(typeof res.body.user.subscription).toBe("string");
  });
});

