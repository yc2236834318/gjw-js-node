let express = require("express");
let router = express.Router();

// 上传文件模块
var multer = require("multer");
// 内置的path模块,用于操作路径
let path = require("path");
// 配置上传图片的路径
var storage = multer.diskStorage({
  // 上传图片的路径
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    // 将上传的图片重命名(防止重名)
    // 文件名字+上传时间戳
    cb(null, Date.now() + path.exrname(file.originalname));
  },
});

// 上传中间件
// 根据存储设置,创建upload
// single("img"):支持一次上传一张图
var upload = multer({ storage: storage }).single("img");

// 将中间件放入接口中
router.post("/", upload, function () {
  let file = req.file; // 存放上传的图片对象
  let imgUrl = "/images/" + file.filename; // 存放图片路径和名字
  res.json({
    code: 1,
    msg: "上传文件成功",
    data: imgUrl,
  });
});

module.exports = router;
