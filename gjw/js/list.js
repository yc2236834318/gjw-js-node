// nodejs模块
window.addEventListener("load", function () {
  let username = localStorage.getItem("username");
  let nickname = localStorage.getItem("nickname");

  let shortcut = document.querySelector(".shortcut");
  let login = shortcut.querySelector(".login");
  let users = login.querySelector("span");
  users.innerHTML = nickname;
});

// header模块
window.addEventListener("load", function () {
  // 下拉菜单
  var header = document.querySelector(".header");
  var nav = header.querySelector(".nav");
  var navSubs = nav.querySelectorAll(".nav-sub");
  var navMenu = nav.querySelector(".nav-menu");
  var navLists = nav.querySelectorAll(".nav-container");
  // 下拉菜单背景
  nav.addEventListener("mouseenter", function () {
    navMenu.style.height = "230px";
    navMenu.classList.add("boxshadow");
    navMenu.style.transition = "box-shadow 0.1s 0.2s, height 0.2s";
  });
  nav.addEventListener("mouseleave", function () {
    navMenu.style.height = 0;
    navMenu.classList.remove("boxshadow");
    navMenu.style.transition = "none";
  });
  // 下拉菜单内容
  for (let i = 0; i < navSubs.length; i++) {
    navSubs[i].addEventListener("mouseenter", function () {
      navLists[i].style.display = "block";
      this.children[0].style.color = "#ff6700";
    });
    navSubs[i].addEventListener("mouseleave", function () {
      navLists[i].style.display = "none";
      this.children[0].style.color = "#000000";
    });
  }
});

// main模块
window.addEventListener("load", function () {
  var main = document.querySelector(".main");
  // (一)hd模块
  var classHd = main.querySelector(".classify-hd");
  classHd.children[0].addEventListener("mouseenter", function () {
    this.style.color = "#000";
  });
  classHd.children[0].addEventListener("mouseleave", function () {
    this.style.color = "#666";
  });

  // (二)bd模块
  var classBd = main.querySelector(".classify-bd");
  var as = classBd.querySelectorAll("a");
  // 悬浮变色
  for (let i = 0; i < as.length; i++) {
    as[i].addEventListener("mouseenter", function () {
      this.style.color = "#ca151e";
    });
    as[i].addEventListener("mouseleave", function () {
      this.style.color = "#000";
    });
  }
  // 点击变色
  // 变色函数
  function classify(as) {
    for (let i = 0; i < as.length; i++) {
      as[i].addEventListener("click", function () {
        for (let i = 0; i < as.length; i++) {
          // 排他思想
          as[i].classList.remove("current");
        }
        this.classList.add("current");
      });
    }
  }
  var lists = classBd.querySelectorAll(".classify-list"); // 获取所有类别行
  for (let i = 0; i < lists.length; i++) {
    // 让每个ul中的所有a都执行变色函数(3个ul执行3次)
    classify(lists[i].querySelectorAll("a"));
  }
  // goods悬浮
  var channel = main.querySelector(".channel-list");
  var goods = channel.querySelectorAll("li");
  for (let i = 0; i < goods.length; i++) {
    goods[i].addEventListener("mouseenter", function () {
      this.classList.add("goods-hover");
    });
    goods[i].addEventListener("mouseleave", function () {
      this.classList.remove("goods-hover");
    });
  }

  // (三)筛选模块
  var brands = lists[0].querySelectorAll("a"); // 获取品牌子选项
  var categorys = lists[1].querySelectorAll("a"); // 获取分类子选项
  var arrGoods = []; // 存放满足所有条件的商品
  for (let i = 0; i < goods.length; i++) {
    arrGoods.push(goods[i]); // 默认存放所有商品
  }
  // 检测函数
  function checkFun(option, arr) {
    var flag;
    for (let i = 0; i < option.length; i++) {
      if (option[i].classList[0] === "current") {
        flag = arr[i]; // 获取被选中的选项
      }
    }
    return flag;
  }
  // 筛选函数
  function sortFun(num1, num2, flag) {
    var num = 0;
    var arr = [];
    for (let i = 0; i < goods.length; i++) {
      var code = goods[i].dataset.code.substring(num1, num2); // 截取code中品牌或分类代码
      if (flag === "all") {
        // 如果是全部,就把所有商品放进数组
        arr[num++] = goods[i];
      } else if (code === flag) {
        // 否则只放入满足条件的商品
        arr[num++] = goods[i];
      }
    }
    return arr;
  }

  // 给所有子选项设置点击事件
  for (let i = 0; i < lists.length; i++) {
    lists[i].addEventListener("click", function () {
      // (1)点击筛选时先隐藏所有商品
      for (let i = 0; i < goods.length; i++) {
        goods[i].style.display = "none";
      }
      // (2)清空arrGoods数组
      arrGoods = [];
      // (3)筛选品牌数组
      var arrBrand = ["all", "10", "11", "12", "13"];
      var option1 = checkFun(brands, arrBrand); // 检测函数:检测品牌中的选项
      var brandGoods = sortFun(2, 4, option1); // 筛选函数:找出满足品牌的商品
      // (4)筛选分类数组
      var arrCate = ["all", "10", "11", "12"];
      var option2 = checkFun(categorys, arrCate); // 检测函数:检测分类中的选项
      var cateGoods = sortFun(0, 2, option2); // 筛选函数:找出满足分类的商品
      // (5)找出两个数组中重复的商品
      for (let i = 0; i < brandGoods.length; i++) {
        var code1 = brandGoods[i].dataset.code;
        for (let j = 0; j < cateGoods.length; j++) {
          var code2 = cateGoods[j].dataset.code;
          if (code1 === code2) {
            arrGoods.push(cateGoods[j]);
            break;
          }
        }
      }
      // (6)将筛选出的商品显示出来
      for (let i = 0; i < arrGoods.length; i++) {
        arrGoods[i].style.display = "block";
      }
    });
  }
});

// leap模块
window.addEventListener("load", function () {
  var leap = document.querySelector(".main-leap");
  var sub = leap.querySelector(".leap-sub");
  var subs = sub.querySelectorAll("a");
  for (let i = 0; i < subs.length; i++) {
    subs[i].addEventListener("mouseenter", function () {
      this.classList.add("c3");
    });
    subs[i].addEventListener("mouseleave", function () {
      this.classList.remove("c3");
    });
  }
  // 返回顶部
  subs[2].addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
  });
});

// hot模块
window.addEventListener("load", function () {
  var hot = document.querySelector(".hot");
  var hotSwipers = hot.querySelectorAll(".swiper-slide");
  // hot悬浮动画
  for (let i = 0; i < hotSwipers.length; i++) {
    hotSwipers[i].addEventListener("mouseenter", function () {
      this.classList.add("hot-hover");
    });
    hotSwipers[i].addEventListener("mouseleave", function () {
      this.classList.remove("hot-hover");
    });
  }
});
