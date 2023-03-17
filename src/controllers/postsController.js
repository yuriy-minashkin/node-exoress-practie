let posts = [
  { id: "1", topic: "test1", text: "test text1" },
  { id: "2", topic: "test2", text: "test text2" },
  { id: "3", topic: "test3", text: "test text3" },
];

const getPosts = (req, res) => {
  res.json({ posts, status: "success" });
};

const getPostById = (req, res) => {
  const { id } = req.params;
  const [post] = posts.filter((item) => item.id === id);
  if (!post) {
    res.status(400).json({ status: `failure, no user with id: ${id} found!` });
  }
  res.json({ post, status: "success" });
};

const addPost = (req, res) => {
  const { topic, text } = req.body;

  posts.push({
    id: uuidv4(),
    topic,
    text,
  });

  res.json({ status: "success" });
};

const changePost = (req, res) => {
  const { topic, text } = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });

  res.json({ status: "success" });
};

const patchPost = (req, res) => {
  const { topic, text } = req.body;
  posts.forEach((post) => {
    if (post.id === req.params.id) {
      if (topic) {
        post.topic = topic;
      }
      if (text) {
        post.text = text;
      }
    }
  });
  res.json({ status: "success" });
};

const deletePost = (req, res) => {
  posts = posts.filter((item) => item.id !== req.params.id);
  res.json({ status: "success" });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
