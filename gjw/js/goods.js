// nodejs模块
window.addEventListener("load", function () {
  let username = localStorage.getItem("username");
  let nickname = localStorage.getItem("nickname");

  // 用户显示
  let shortcut = document.querySelector(".shortcut");
  let login = shortcut.querySelector(".login");
  let users = login.querySelector("span");
  users.innerHTML = nickname;

  // 加入购物车
  let goods = document.querySelector(".goods");
  let goodsImg = goods.querySelector("img");
  let goodsImgURL = goodsImg.src; // 获取商品图片路径
  let h3 = goods.querySelector("h3");
  let title = h3.innerHTML; // 获取商品型号内容
  let p = goods.querySelector("p");
  let price = p.innerHTML.substring(2, 6); // 获取商品价格
  let num = 1; // 获取商品数量(默认为1)
  let btn = goods.querySelector("button");
  let sub = price * num; // 获取商品小计
  btn.addEventListener("click", function () {
    if (localStorage.getItem("uid")) {
      // 如果已登录就添加到购物车
      http
        .post("/api/articles", { title, price, num, sub, goodsImgURL })
        .then((r) => {
          console.log(r.data);
          layer.msg(r.data.msg); // 弹出提示信息
        })
        .catch((err) => {
          console.log(err);
          // layer.msg(err.data.msg); // 弹出提示信息
        });
    } else {
      // 如果没登录就跳转到登录页
      alert("请先登录");
      window.location.href = "../login.html";
    }
  });
});
