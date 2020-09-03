// 获取元素
function getElem(selector) {
  return document.querySelector(selector);
}

function getAllElem(selector) {
  return document.querySelectorAll(selector);
}

// 获取元素样式
function getCls(selector) {
  return getElem(selector).getAttribute('class');
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
