// 所要要实现动画效果的元素类都放到下面的对象中
var screenAnimateElements = {
  '.screen-1': [
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow'
  ]
}

function setScreenAnimate(screenSelector) {
  // 获取当前要调试的屏
  var screen = document.querySelector(screenSelector);
  // 获取屏幕中需要设置动画效果的元素选择器
  var animateElements = screenAnimateElements[screenSelector];

  // 是否有初始化元素的样式？
  var isSetAnimateInitClass = false;

  // 当前屏幕下所有子元素的状态是否为done？
  var isAnimateDone = false;

  screen.onclick = function() {

    //执行一次
    // 初始化样式
    if (!isSetAnimateInitClass) {
      for (var i=0; i<animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
      }
      isSetAnimateInitClass = true;
      return;
    }

    // 下面两个交替执行
    // 切换所有 animateElements 的 init --> done
    if (!isAnimateDone) {
      for (var i=0; i<animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
      }
      isAnimateDone = true;
      return;
    }

    // 切换所有 animateElements 的 done --> init
    if (isAnimateDone) {
      for (var i=0; i<animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_done', '_animate_init'));
      }
      isAnimateDone = false;
      return;
    }

  }
}

// 对对象进行循环
for(k in screenAnimateElements) {
  setScreenAnimate(k);
}
