const express = require("express");
const router = express.Router();

const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login?msg='Error auth'",
  }),
  function (req, res) {
    console.log("Logged in", req.body);
    res.redirect("/");
  }
);

router.get("/getUser", (req, res) =>
  res.send({ username: req.user ? req.user.username : null })
);

router.get("/logout", function (req, res) {
  req.logout();
  // res.redirect("/");
  res.send({});
});

module.exports = router;
