
module.exports = function (req, res, next) {
  res.status(404);
  res.json({ status: 404, title: "Not Found", msg: "Route not found" });
  next();
}
