const express = require("express");
const pool = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;
const app = express();

const secret = "2025secretsecret";
const maxAge = 60 * 60;

//Middleware
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//JWT
const generateJWT = (id) => jwt.sign({ id }, secret, { expiresIn: maxAge });

//Authentication
app.get("/auth/authenticate", async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.json({ authenticated: false });
    res.json({ authenticated: true, user_id: decoded.id });
  });
});

//Signup
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await pool.query(
      "INSERT INTO users(email, password) VALUES ($1,$2) RETURNING *",
      [email, hash]
    );

    const token = generateJWT(user.rows[0].id);
    res
      .status(201)
      .cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true, sameSite: "strict" })
      .json({ user_id: user.rows[0].id });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
});

//Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) return res.status(401).json({ error: "User not registered" });

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(401).json({ error: "Incorrect password" });

    const token = generateJWT(user.rows[0].id);
    res
      .status(200)
      .cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true, sameSite: "strict" })
      .json({ user_id: user.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Logout
app.get("/auth/logout", (req, res) => {
  res.clearCookie("jwt").json({ message: "Logged out" });
});

//Get all posts
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Add a post
app.post("/posts", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, secret);
    const { content } = req.body;

    const result = await pool.query(
      "INSERT INTO posts(content, user_id) VALUES ($1, $2) RETURNING *",
      [content, decoded.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//Delete all posts
app.delete("/posts", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, secret);

    await pool.query("DELETE FROM posts");
    res.json({ message: "All posts deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Update post
app.put("/posts/:id", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, secret);

    const { id } = req.params;
    const { content } = req.body;

    const result = await pool.query(
      "UPDATE posts SET content = $1 WHERE id = $2 RETURNING *",
      [content, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete post
app.delete("/posts/:id", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, secret);

    const { id } = req.params;
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get single post
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log("Server is listening to port " + port);
});
