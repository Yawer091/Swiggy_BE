const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { PostModel } = require("../model/post.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await UserModel.findById(decode.id);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "authentication failed" });
  }
};

const isPostOwner = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ msg: "An error occurred" });
  }
};

module.exports = {
  auth,
  isPostOwner,
};
