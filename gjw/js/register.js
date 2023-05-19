window.addEventListener("load", function () {
  let ips = document.querySelectorAll("input");
  // 注册按钮
  let regForm = document.querySelector(".reg_form");
  regForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // 阻止页面自动刷新
    let username = ips[0].value; // 获取账号
    let nickname = ips[1].value; // 获取昵称
    let password = ips[2].value; // 获取密码
    let psd = ips[3].value; // 获取重复密码

    if (password === psd) {
      let r = await http.post("/api/users", { username, nickname, password });
      console.log(r);
      layer.msg(r.data.msg); // 弹出提示信息
      if (r.data.code == 1) {
        // 注册成功则2秒后跳转到登录页
        setTimeout(() => {
          location.href = "login.html";
        }, 2000);
      }
    } else {
      alert("两次密码不相同,请重新输入!");
      ips[2].value = "";
      ips[3].value = "";
    }
  });
});
