// nodejs模块
window.addEventListener("load", function () {
  let username = localStorage.getItem("username");
  let nickname = localStorage.getItem("nickname");

  let shortcut = document.querySelector(".shortcut");
  let login = shortcut.querySelector(".login");
  let users = login.querySelector("span");
  let header = document.querySelector(".header");
  let usersCart = header.querySelector("span");
  users.innerHTML = nickname;
  usersCart.innerHTML = nickname;

  // 商品添加
  async function loadCartList() {
    let uid = localStorage.getItem("uid"); // 获取用户ID
    let r = await http.get("/api/articles/users/" + uid); // 发起创建商品请求
    console.log(r);
    let cartArr = r.data.data; // 购物车商品数组
    // 将商品数组映射到购物车中
    let liArr = cartArr.map(
      (v) => `
    <li>
    <img src="${v.goodsImgURL}" alt="" />
    <h3>${v.title}</h3>
    <p>${v.price}</p>
    <span>
    <b class="minus" data-id="${v._id}">-</b>
    <h4>${v.num}</h4>
    <b class="add" data-id="${v._id}">+</b>
    </span>
    <i>${v.sub}</i>
    <em class="del" data-id="${v._id}">删除</em>
    </li>
    `
    );
    // 将商品结构加入到购物车的html中
    document.querySelector(".goods-list").innerHTML = liArr.join("");
  }
  loadCartList();

  // cart模块
  let list = document.querySelector(".goods-list");
  let total = document.querySelector(".cart-total");
  let numbers = total.querySelector("i");
  let money = total.querySelector("em");
  // 商品数量和价格模块
  function sumFun() {
    // 商品总数量和总价格更新函数
    let lis = list.querySelectorAll("li");
    let n = 0;
    let p = 0;
    for (let i = 0; i < lis.length; i++) {
      n += lis[i].children[3].children[1].innerHTML * 1;
      p += lis[i].children[4].innerHTML * 1;
    }
    numbers.innerHTML = n;
    money.innerHTML = p;
  }
  setTimeout(sumFun, 100); // 延时0.1秒后执行,以免不生效

  // 商品操作模块
  list.onclick = async function (e) {
    // 点击购物车
    if (e.target.classList.contains("del")) {
      // 如果点击的是删除按钮
      let delBtn = e.target;
      let aid = delBtn.dataset.id; // 获取删除商品的id
      let r = await http.delete("/api/articles/" + aid); // 删除商品
      layer.msg("删除成功"); // 弹出提示信息
      loadCartList(); // 重新加载商品
      setTimeout(sumFun, 100); // 执行商品总数量和总价格更新函数
    } else if (e.target.classList.contains("add")) {
      // 如果点击的是加按钮
      let addBtn = e.target;
      let aid = addBtn.dataset.id; // 获取增加商品的id
      let num = addBtn.previousElementSibling.innerHTML; // 获取商品当前的数量
      let price = addBtn.parentNode.previousElementSibling.innerHTML; // 获取商品的单价
      num++;
      let sub = num * price; // 计算商品小计
      let r = await http.patch("/api/articles/" + aid, { num, sub }); // 修改数量和小计
      loadCartList(); // 重新加载商品
      setTimeout(sumFun, 100); // 执行商品总数量和总价格更新函数
    } else if (e.target.classList.contains("minus")) {
      // 如果点击的是减按钮
      let minusBtn = e.target;
      let aid = minusBtn.dataset.id; // 获取减去商品的id
      let num = minusBtn.nextElementSibling.innerHTML; // 获取商品当前的数量
      let price = minusBtn.parentNode.previousElementSibling.innerHTML; // 获取商品的单价
      if (num > 1) {
        num--;
        let sub = num * price; // 计算商品小计
        let r = await http.patch("/api/articles/" + aid, { num, sub }); // 修改数量和小计
        loadCartList(); // 重新加载商品
        setTimeout(sumFun, 100); // 执行商品总数量和总价格更新函数
      } else {
        layer.msg("最少为1"); // 弹出提示信息
      }
    }
  };
});
