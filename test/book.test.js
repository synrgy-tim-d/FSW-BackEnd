const request = require("supertest");
const app = require("../app");

describe("JEST TESTING", () => {
  it("should return 200 OK", () => {
    return request(app).get("/").expect(200);
  });
});
