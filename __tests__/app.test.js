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
    test("return correct article when passed an article id ", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
          expect(Object.keys(body.articles)).toHaveLength(8);
        });
    });
    test("for articles with invalid ids we should expect a 404 error", () => {
      return request(app)
        .get("/api/articles/4311462")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    test("returns an array of comments with appropriate properties", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toEqual({
            article_id: 1,
            author: "icellusedkars",
            body: "I hate streaming noses",
            comment_id: 5,
            created_at: "2020-11-03T21:00:00.000Z",
            votes: 0,
          });
        });
    });
    test("comments should return the most recent one first ", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).not.toEqual({
            author: "butter_bridge",
            body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
            comment_id: 2,
            created_at: "2020-10-31T03:03:00.000Z",
            votes: 14,
          });
        });
    });

    test("404 error for endpoint request to non existent articles ", () => {
      return request(app)
        .get("/api/articles/98/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
  });
});
