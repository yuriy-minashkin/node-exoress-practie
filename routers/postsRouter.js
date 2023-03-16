const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

let posts = [
  { id: "1", topic: "test1", text: "test text1" },
  { id: "2", topic: "test2", text: "test text2" },
  { id: "3", topic: "test3", text: "test text3" },
];
// GET /api/posts => [...posts]
router.get("/", (req, res) => {
  res.json({ posts, status: "success" });
});
// GET /api/posts<123> => {post with id 123}
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const [post] = posts.filter((item) => item.id === id);
  if (!post) {
    res.status(400).json({ status: `failure, no user with id: ${id} found!` });
  }
  res.json({ post, status: "success" });
});
// POST /api/posts => [newPost, ...posts]
router.post("/", (req, res) => {
  const { topic, text } = req.body;

  const schema = Joi.object({
    topic: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(10).max(400).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(400)
      .json({ status: validationResult.error.details[0].message });
  }

  posts.push({
    id: uuidv4(),
    topic,
    text,
  });

  res.json({ status: "success" });
});

// PUT /api/posts/123 => [changedPost, ...posts]
router.put("/:id", (req, res) => {
  const { topic, text } = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });

  res.json({ status: "success" });
});

// DELETE /api/posts/123 => [posts without post with id 123]
router.delete("/:id", (req, res) => {
  posts = posts.filter((item) => item.id !== req.params.id);
  res.json({ status: "success" });
});

module.exports = { postsRouter: router };
