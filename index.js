const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { postRoute } = require("./routes/post.routes");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRoute);
app.use("/api", postRoute);

app.get("/", (req, res) => {
  res.json({ msg: "CHECKING" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at port ${process.env.PORT}`);
  } catch (err) {
    console.error(err);
  }
});
