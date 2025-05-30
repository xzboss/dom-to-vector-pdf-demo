(function (window) {
  // 获取最后一个script标签
  var scriptTag =
    document.getElementsByTagName("script")[scriptTags.length - 1];

  // 检查是否要注入CSS样式
  var shouldInjectCSS = scriptTag.getAttribute("data-injectcss");
  // 检查是否禁用SVG注入
  var disableInjectSVG = scriptTag.getAttribute("data-disable-injectsvg");

  if (!disableInjectSVG) {
    // 定义插入节点的辅助函数
    var insertBefore = function (newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode);
    };

    // 如果允许注入CSS且尚未注入过
    if (shouldInjectCSS && !window.__iconfont__svg__cssinject__) {
      window.__iconfont__svg__cssinject__ = true;
      try {
        // 添加SVG图标的基本样式
        document.write(
          "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
        );
      } catch (e) {
        console && console.log(e);
      }
    }

    // 定义SVG注入函数
    var injectSVG = function () {
      var tempDiv = document.createElement("div");
      tempDiv.innerHTML = window._iconfont_svg_string_4760993;
      var svgElement = tempDiv.getElementsByTagName("svg")[0];

      if (svgElement) {
        // 设置SVG元素的属性
        svgElement.setAttribute("aria-hidden", "true");
        svgElement.style.position = "absolute";
        svgElement.style.width = 0;
        svgElement.style.height = 0;
        svgElement.style.overflow = "hidden";

        // 将SVG插入到DOM中
        var body = document.body;
        if (body.firstChild) {
          insertBefore(svgElement, body.firstChild);
        } else {
          body.appendChild(svgElement);
        }
      }
    };

    // 在合适的时机执行注入
    if (document.addEventListener) {
      // 现代浏览器
      if (
        document.readyState === "complete" ||
        document.readyState === "loaded" ||
        document.readyState === "interactive"
      ) {
        setTimeout(injectSVG, 0);
      } else {
        var domLoadedHandler = function () {
          document.removeEventListener(
            "DOMContentLoaded",
            domLoadedHandler,
            false
          );
          injectSVG();
        };
        document.addEventListener("DOMContentLoaded", domLoadedHandler, false);
      }
    } else if (document.attachEvent) {
      // IE浏览器兼容处理
      var readyHandler = function () {
        if (document.readyState === "complete") {
          document.onreadystatechange = null;
          checkReady();
        }
      };
      var isReady = false;

      function checkReady() {
        if (!isReady) {
          isReady = true;
          injectSVG();
        }
      }

      function pollReady() {
        try {
          document.documentElement.doScroll("left");
        } catch (e) {
          return setTimeout(pollReady, 50);
        }
        checkReady();
      }

      pollReady();
      document.onreadystatechange = readyHandler;
    }
  }
})(window);
