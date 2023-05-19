var express = require("express");
var router = express.Router();

var { Article } = require("../models/index");

/* GET home page. */
// 接口配置
// /api/articles // 添加到购物车
router.post("/", function (req, res, next) {
  console.log(req.body);
  console.log(req.auth.uid);
  Article.create({
    ...req.body,
    cart: req.auth.uid,
  })
    .then((r) => {
      res.json({
        code: 1,
        msg: "添加到购物车成功",
        data: r,
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "添加到购物车失败",
        data: err,
      });
    });
});
// /api/articles/users/:uid // 根据用户id匹配购物车
router.get("/users/:uid", function (req, res, next) {
  console.log(req.params); // {uid:1}
  Article.find({ cart: req.params.uid })
    .populate("cart", { password: 0 })
    .then((r) => {
      res.json({
        code: 1,
        msg: "获取购物车数据",
        data: r,
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "获取失败",
        data: err,
      });
    });
});

// /api/articles/users/:aid // 根据购物车id删除购物车
router.delete("/:aid", function (req, res, next) {
  console.log(req.params); // {uid:11}
  Article.findByIdAndDelete(req.params.aid)
    .then((r) => {
      if (r) {
        res.json({
          code: 1,
          msg: "商品已删除",
        });
      } else {
        res.json({
          code: 0,
          msg: "商品不存在",
        });
      }
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "删除失败",
      });
    });
});
// /api/articles/users/:aid // 根据购物车id编辑购物车
router.patch("/:aid", function (req, res, next) {
  console.log(req.params); // {aid:1}
  console.log(req.body);
  Article.findByIdAndUpdate(req.params.aid, { ...req.body }, { new: true })
    .then((r) => {
      res.json({
        code: 1,
        msg: "修改成功",
        data: r,
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "修改失败",
        data: err,
      });
    });
});

// 数据导出
module.exports = router;
