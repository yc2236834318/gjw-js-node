var express = require("express");
var router = express.Router();

let { User } = require("../models/index");

/* 注册请求 */
router.post("/", function (req, res, next) {
  let username = req.body.username;
  let nickname = req.body.nickname;
  let password = req.body.password;
  if (username && password && nickname) {
    // 创建用户,插入数据库
    User.create(req.body)
      .then((r) => {
        console.log(r);
        res.json({
          code: 1,
          msg: "注册成功,2秒后跳转登录",
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          code: 0,
          msg: "注册失败,账号已存在",
          err: "账号已存在",
        });
      });
  } else {
    res.json({
      code: 0,
      msg: "注册失败,缺少参数",
    });
  }
});

/* 登录请求 */
let jwt = require("jsonwebtoken"); // 引入身份认证模块
router.get("/", function (req, res, next) {
  console.log(req.query);
  let { username, password } = req.query;
  User.findOne({ username, password }).then((r) => {
    console.log(r);
    if (r == null) {
      // 如果没有该账号则登录失败
      res.json({
        code: 0,
        msg: "账号或密码错误",
      });
    } else {
      // 如果账号密码匹配就生成身份令牌
      let token = jwt.sign({ username: username, uid: r._id }, "test12345", {
        // username:身份名,"test12345":密钥
        expiresIn: "1d", // 有效时间
        algorithm: "HS256", // 加密方式
      });
      res.json({
        code: 1,
        msg: "登录成功",
        token,
        uid: r._id,
        username: r.username,
        nickname: r.nickname,
      });
    }
  });
});

module.exports = router;
