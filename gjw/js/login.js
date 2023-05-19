window.addEventListener("load", function () {
  // 监听表单的提交事件
  // 获取账号和密码
  // 发起登录请求
  let loginForm = document.querySelector(".login_form");
  let ips = loginForm.querySelectorAll("input");

  loginForm.onsubmit = async function (e) {
    e.preventDefault();
    let username = ips[0].value;
    let password = ips[1].value;
    let loginAPI = "/api/users";
    // 发起get请求并获取账号密码
    let r = await http.get(loginAPI, { params: { username, password } });
    console.log(r.data);
    // 如果登录成功,就将获取的账号昵称uid令牌存放到本地数据以便后面使用
    layer.msg(r.data.msg); // 弹出提示信息
    if (r.data.code == 1) {
      localStorage.setItem("username", username);
      localStorage.setItem("uid", r.data.uid);
      localStorage.setItem("nickname", r.data.nickname);
      localStorage.setItem("token", r.data.token);
      setTimeout(() => {
        location.href = "index.html"; // 登录后跳转到首页
      }, 1000);
    }
  };
});
