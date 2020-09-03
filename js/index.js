// 获取元素
function getElem(selector) {
  return document.querySelector(selector);
}

function getAllElem(selector) {
  return document.querySelectorAll(selector);
}

// 获取元素样式
function getCls(element) {
  return element.getAttribute('class');
}

//设置元素样式
function setCls(element, cls) {
  return element.setAttribute('class', cls);
}

// 为元素添加样式
function addCls(element, cls) {
  var baseCls = getCls(element);
  if (baseCls.indexOf(cls) === -1) {
    setCls(element, baseCls + ' ' + cls);
  }
}

// 为元素删除样式
function delCls(element, cls) {
  var baseCls = getCls(element);
  if (baseCls.indexOf(cls) !== -1) {
    setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
  }
  return;
}

// 需要设置动画效果的元素
var screenAnimateElements = {
  '.screen-1': [
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow',
  ],
  '.screen-2': [
    '.screen-2__heading',
    '.screen-2__subheading',
    '.screen-2__phone',
    '.screen-2__point_i_1',
    '.screen-2__point_i_2',
    '.screen-2__point_i_3',
  ],
  '.screen-3': [
    '.screen-3__heading',
    '.screen-3__phone',
    '.screen-3__subheading',
    '.screen-3__features',
  ],
  '.screen-4': [
    '.screen-4__heading',
    '.screen-4__subheading',
    '.screen-4__type__item_i_1',
    '.screen-4__type__item_i_2',
    '.screen-4__type__item_i_3',
    '.screen-4__type__item_i_4',
  ],
  '.screen-5': [
    '.screen-5__heading',
    '.screen-5__subheading',
    '.screen-5__bg',
  ]
};

function setScreenAnimateInit(screenCls) {
  var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素
  for (var i=0; i<animateElements.length; i++) {
    var element = getElem(animateElements[i]);
    var baseCls = getCls(element);
    setCls(element, baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
  }
}

// 第一步：初始化设置
window.addEventListener('load', function() {
  for (k in screenAnimateElements) {
    setScreenAnimateInit(k);
  }
  addCls(getElem('.outline'), 'outline_status_in');
})

// 第二步：滚动条设置
function playScreenAnimateDone(screenCls) {
  var animateElements = screenAnimateElements[screenCls];
  for (var i=0; i<animateElements.length; i++) {
    var element = getElem(animateElements[i]);
    var baseCls = getCls(element);
    setCls(element, baseCls.replace('_animate_init', '_animate_done'));
  }
}

// 1秒后自动执行第一屏动画
// 1.5秒后自动执行第一屏动画
setTimeout(function () { playScreenAnimateDone('.screen-1'); }, 1000)
setTimeout(function () { playScreenAnimateDone('.screen-2'); }, 2000)


var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');

window.addEventListener('scroll', function() {
  var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  // 导航条样式变动
  if (top > 100) {
    getElem('.screen-1').style.paddingTop = 80 + 'px'; // 解决由于滚动导致页面跳动的问题
    addCls(getElem('.header'), 'header_status_black');
  } else {
    getElem('.screen-1').style.paddingTop = '';
    delCls(getElem('.header'), 'header_status_black'); // 解决由于滚动导致页面跳动的问题
    switchNavItemActive(0);
  }

  // addCls(getElem('.outline'), 'outline_status_in');
  // if (top > (800 * 1)) {
  // }

  if (top > (800 * 1 - 200)) {
    playScreenAnimateDone('.screen-2');
    switchNavItemActive(1);
  }

  if (top > (800 * 2 - 500)) {
    playScreenAnimateDone('.screen-3');
    switchNavItemActive(2);
  }

  if (top > (800 * 3 - 600)) {
    playScreenAnimateDone('.screen-4');
    switchNavItemActive(3);
  }

  if (top > (800 * 4 - 700)) {
    playScreenAnimateDone('.screen-5');
    switchNavItemActive(4);
  }
})

// 第三步 导航条双向定位
// 3.1 导航条 - 点击页面跳转
function setNavJump(i, elems) {
  var elem = elems[i];
  elem.onclick = function() {
    document.documentElement.scrollTop = i * 800 + 1;
  }
}

for (var i=0; i<navItems.length; i++) {
  setNavJump(i, navItems);
}

// 3.2  大纲-点击跳转
for (var i=0; i<outlineItems.length; i++) {
  setNavJump(i, outlineItems);
}

// 3.3 双向绑定，回到 onscrollTop（移动 navIntes、outLineItems到顶固）、增加 clear 样式 函数
function switchNavItemActive(idx) {
  for (var i=0; i<navItems.length; i++) {
    delCls(navItems[i], 'header__nav-item_status_active');
  }
  addCls(navItems[idx], 'header__nav-item_status_active');
  navTip.style.left = (idx * 70) + 'px';

  for (var i=0; i<outlineItems.length; i++) {
    delCls(outlineItems[i], 'outline__item_status_active');
  }
  addCls(outlineItems[idx], 'outline__item_status_active');
}

// 滑动门
var navTip = getElem('.header__nav-tip');
function setTip(idx, elems) {
  elems[idx].addEventListener('mouseover', function() {
    navTip.style.left = (idx * 70) + 'px';
  })

  var currentIdx = 0;
  elems[idx].addEventListener('mouseout', function() {
    for(var i=0; i<elems.length; i++) {
      if (getCls(elems[i]).indexOf('header__nav-item_status_active') != -1) {
        currentIdx = i;
        break;
      }
    }
    navTip.style.left = (currentIdx * 70) + 'px';
  })
}

for (var i=0; i<navItems.length; i++) {
  setTip(i, navItems);
}
