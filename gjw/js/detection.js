window.addEventListener("load", function () {
  // 退出登录
  var shortcut = document.querySelector(".shortcut");
  var login = shortcut.querySelector(".login");
  var exit = login.querySelector(".exit");
  window.addEventListener("click", function (e) {
    // 点击用户出现退出登录,点击其他地方隐藏退出登录
    if (e.target.classList.contains("users")) {
      exit.style.display = "block";
    } else {
      exit.style.display = "none";
    }
  });
  exit.addEventListener("click", function () {
    // 点击退出登录就清除本地存储的用户信息
    localStorage.clear();
    window.location.href = "login.html"; // 跳转到登录页
  });
  function userFun() {
    // 登录检测函数
    var shortcut = document.querySelector(".shortcut");
    var login = shortcut.querySelector(".login");
    var log = login.querySelector(".log");
    var reg = login.querySelector(".reg");
    var users = login.querySelector(".users");
    var cartUser = login.querySelector(".cart-user");
    var cartSub = document.querySelector(".cart-sub");
    if (localStorage.getItem("uid")) {
      // 如果已登录
      // 隐藏登录注册,显示用户名
      log.style.display = "none";
      reg.style.display = "none";
      users.style.display = "block";
      // 点击购物车时跳转到购物车
      cartUser.addEventListener("click", function () {
        window.open("cart.html");
      });
      cartSub.addEventListener("click", function () {
        window.open("cart.html");
      });
    } else {
      // 如果没登录
      // 显示登录注册,隐藏用户名
      log.style.display = "block";
      reg.style.display = "block";
      users.style.display = "none";
      // 点击购物车时跳转到登录页
      cartUser.addEventListener("click", function () {
        alert("请先登录");
        window.location.href = "login.html";
      });
      cartSub.addEventListener("click", function () {
        alert("请先登录");
        window.location.href = "login.html";
      });
    }
  }
  setTimeout(userFun, 100);
});
