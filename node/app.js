var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let { expressjwt } = require("express-jwt");

var articlesRouter = require("./routes/articles");
var usersRouter = require("./routes/users");
var uploadRouter = require("./routes/upload");

var app = express();
//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  //允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  // //跨域允许的请求方式
  res.header(
    "Access-Control-Allow-Methods",
    "PATCH,PUT,POST,GET,DELETE,OPTIONS"
  );
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") {
    res.sendStatus(200).end();
  } else {
    next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 解析jwt
app.use(
  expressjwt({
    secret: "test12345", // 密钥
    algorithms: ["HS256"], // 加密方法
  }).unless({
    // 不需要解析jwt的路由
    path: [
      "/api/users",
      /^\/api\/articles\/users\/w+/,
      {
        url: /^\/api\/articles\/w+/,
        methods: ["GET"],
      },
    ],
  })
);

app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/upload", uploadRouter);

// 身份认证失败
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ code: 0, msg: "请先登录" });
  } else {
    next(err);
  }
});

// 捕获404错误并转发给错误处理程序
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理程序
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 呈现错误页面
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
