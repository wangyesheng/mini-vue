const express = require("express");

const app = new express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method.toLowerCase() === "options") {
    return res.end();
  }
  next();
});

app.get("/api/user", (req, res) => {
  console.log(req.headers.authorization);
  res.json({ name: "jack" });
});

app.listen(3000, () => {
  console.log("server is starting in 3000 port");
});
