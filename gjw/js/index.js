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
  // 搜索按钮
  var searchBtn = header.querySelector(".search-btn");
  searchBtn.addEventListener("click", function () {
    window.location.href = "list.html";
  });
});

// focus模块
window.addEventListener("load", function () {
  // category模块
  var focus = document.querySelector(".focus");
  var category = focus.querySelector(".category");
  var categoryList = category.querySelector(".category-list");
  var categoryItems = category.querySelectorAll(".category-item");
  var spans = category.querySelectorAll("span");
  // category悬浮背景颜色变化及菜单显示隐藏
  for (let i = 0; i < categoryList.children.length; i++) {
    categoryList.children[i].addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#ff6700";
      categoryItems[i].style.display = "block";
    });
    categoryList.children[i].addEventListener("mouseleave", function () {
      this.style.backgroundColor = "transparent";
      categoryItems[i].style.display = "none";
    });
  }
  // 菜单悬浮字体颜色变化
  for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener("mouseenter", function () {
      this.style.color = "#ff6700";
    });
    spans[i].addEventListener("mouseleave", function () {
      this.style.color = "#000000";
    });
  }
});

// banner模块
window.addEventListener("load", function () {
  var banner = document.querySelector(".banner");
  var bannerList = banner.querySelector(".banner-list");
  var lis = bannerList.querySelectorAll("li");
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 15px 30px rgba(0,0,0,.1)";
    });
    lis[i].addEventListener("mouseleave", function () {
      this.style.boxShadow = "none";
    });
  }
});

// main模块
window.addEventListener("load", function () {
  var main = document.querySelector(".main");
  var mainCont = main.querySelector(".main-container");
  var mores = mainCont.querySelectorAll(".more");
  var goods = mainCont.querySelectorAll(".goods");
  // 更多悬浮变色
  for (let i = 0; i < mores.length; i++) {
    mores[i].addEventListener("mouseenter", function () {
      this.children[0].style.color = "#ff6700";
    });
    mores[i].addEventListener("mouseleave", function () {
      this.children[0].style.color = "#424242";
    });
  }
  // goods悬浮动画
  for (let i = 0; i < goods.length; i++) {
    goods[i].addEventListener("mouseenter", function () {
      this.classList.add("goods-hover");
    });
    goods[i].addEventListener("mouseleave", function () {
      this.classList.remove("goods-hover");
    });
  }
});

// leap模块
window.addEventListener("load", function () {
  var leap = document.querySelector(".main-leap");
  var list = leap.querySelector(".leap-goods");
  var sub = leap.querySelector(".leap-sub");
  var lists = list.querySelectorAll("a");
  var subs = sub.querySelectorAll("a");
  // leap显示隐藏
  var banner = document.querySelector(".banner");
  var bannerTop = banner.offsetTop; // banner距离页面顶部的距离
  // 页面滚动事件
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= bannerTop) {
      // window.pageYOffset 返回整个页面在Y轴上滚动的距离
      // window.pageXOffset 返回整个页面在X轴上滚动的距离
      leap.style.display = "block";
    } else {
      leap.style.display = "none";
    }
  });
  // list模块
  for (let i = 0; i < lists.length; i++) {
    // 悬浮变色
    lists[i].addEventListener("mouseenter", function () {
      this.classList.add("c3");
    });
    lists[i].addEventListener("mouseleave", function () {
      this.classList.remove("c3");
    });
    // 点击滚动
    lists[i].addEventListener("click", function () {
      document.documentElement.scrollTop = 950 + i * 700;
    });
  }
  // subs模块
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
