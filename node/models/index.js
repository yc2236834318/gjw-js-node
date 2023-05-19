// 引入mongosse框架
let mongosse = require("mongoose");

// 链接mongdb数据库
mongosse
  .connect("mongodb://127.0.0.1/user-web")
  .then((res) => {
    console.log("链接成功");
  })
  .catch((err) => {
    console.log("链接失败");
  });

// 创建表
let Schema = mongosse.Schema;

// 定义购物表结构
let ArticleSchema = new Schema(
  {
    title: String, // 商品名称
    price: Number, // 商品价格
    num: Number, // 商品数量
    sub: Number, // 商品小计
    goodsImgURL: String, // 商品图片
    cart: { type: Schema.Types.ObjectId, ref: "User" },
    // 表关联:将该商品关联到用户表中的某个用户的购物车
  },
  {
    timestamps: true, // 开启时间戳
  }
);
// 创建购物表数据模型
let Article = mongosse.model("Article", ArticleSchema);

// 定义用户表结构
let UserSchema = new Schema(
  {
    username: { type: String, unique: true, require: true }, // 账号(唯一,必填)
    password: String, // 密码
    nickname: String, // 昵称
  },
  {
    timestamps: true, // 开启时间戳
  }
);
// 创建用户表数据结构
let User = mongosse.model("User", UserSchema);

// 导出数据
module.exports = { User, Article };
