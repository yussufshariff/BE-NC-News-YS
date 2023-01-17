const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const { app } = require("../app/app");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe("API testing", () => {
  describe("/api/topics", () => {
    test("returns an array of topics with the properties of slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(3);
          body.topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
    test("404 error with custom message following user inputting incorrect endpoint url", () => {
      return request(app)
        .get("/api/topicz")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("URL not found");
        });
    });
  });
  describe("api/articles", () => {
    test("returns an array of articles with the appropriates", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(12);
          body.topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                article_img_url: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                title: expect.any(String),
                topic: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String),
              })
            );
          });
        });
    });
    test("data should sorted by the date it was created in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toBeSorted({ descending: true });
        });
    });
    test("comment count should be different according to the total comments in any given article ", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics[5].comment_count).toBe("11");
          expect(topics[topics.length - 1].comment_count).toBe("0");
        });
    });
  });
  describe("/api/articles/:article_id", () => {
    test.only("return correct article when passed an article id ", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body: { articles } }) => {
          console.log(articles);
        });
    });
  });
});
