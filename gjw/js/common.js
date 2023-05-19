window.addEventListener("load", function () {
  // shortcut模块
  // 文字悬浮
  var shortcut = document.querySelector(".shortcut");
  var shortSubs = shortcut.querySelectorAll("a");
  for (let i = 0; i < shortSubs.length; i++) {
    shortSubs[i].addEventListener("mouseenter", function () {
      this.style.opacity = 1;
    });
    shortSubs[i].addEventListener("mouseleave", function () {
      this.style.opacity = 0.8;
    });
  }
  // 下载APP二维码
  var shortLis = shortcut.querySelectorAll("li");
  var triangle = shortcut.querySelector(".triangle");
  var shortcutApp = shortcut.querySelector(".shortcut-app");
  shortLis[5].addEventListener("mouseenter", function () {
    shortcutApp.style.height = "148px";
    triangle.classList.add("ry"); // 三角旋转
  });
  shortLis[5].addEventListener("mouseleave", function () {
    shortcutApp.style.height = 0;
    triangle.classList.remove("ry");
  });

  // footer模块
  // 服务字体悬浮变色
  var service = document.querySelector(".service");
  var serviceAs = service.querySelectorAll("a");
  for (let i = 0; i < serviceAs.length; i++) {
    serviceAs[i].addEventListener("mouseenter", function () {
      this.style.color = "#ff6700";
    });
    serviceAs[i].addEventListener("mouseleave", function () {
      this.style.color = "#333";
    });
  }
  // 底部声明字体变色
  var warrant = document.querySelector(".warrant");
  var warrantAs = warrant.querySelectorAll("a");
  for (let i = 0; i < warrantAs.length; i++) {
    warrantAs[i].addEventListener("mouseenter", function () {
      this.style.color = "#ff6700";
    });
    warrantAs[i].addEventListener("mouseleave", function () {
      this.style.color = "#777777";
    });
  }
});
