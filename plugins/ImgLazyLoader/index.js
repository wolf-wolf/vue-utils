const STATUS_FLAG = 'lazy-load';

let g_listenerQueue = {}; // 滚动事件处理函数缓存
let g_defSrc = {};

function shouldLoad(el) {
  return el.getBoundingClientRect().top < document.documentElement.clientHeight || el.getBoundingClientRect().top < 0;
}

/**
 * 图片预加载处理
 * @param {Object} el - 元素对象
 * @private
 */
function loading(el) {
  // 构建Image对象，先进行图片拉去的操作
  let vImg = new Image();
  let isError = false;
  vImg.src = window.atob(el.id).split('&&')[0];

  // 轮询图片加载完成的，进行src的替换，并清理内存
  let intervalHandler = setInterval(() => {
    if (vImg.complete && !isError) {
      clearInterval(intervalHandler);
      el.src = vImg.src;
      vImg = null;
      intervalHandler = null;

      rendered(el)
    }
  }, 100);

  vImg.onerror = function () {
    isError = false;
    clearInterval(intervalHandler);
    vImg = null;
    intervalHandler = null
  }
}

function rendered(el) {
  el.setAttribute(STATUS_FLAG, 'loaded'); // 设置图片为已经加载完成的状态
  el.removeAttribute('id')
}

function initImgLoad(el, binding) {
  el.id = window.btoa(binding.value); // 为元素添加唯一Id，方便后面使用

  // 图片不在可视区
  if (!shouldLoad(el)) {
    // 滚动监听处理函数
    g_listenerQueue[el.id] = () => {
      // 判断图片元素是否已经加载
      if (el.getAttribute(STATUS_FLAG) === 'loaded') {
        window.removeEventListener('scroll', g_listenerQueue[el.id]); // 移除滚动监听函数
        delete g_listenerQueue[el.id]; // 删除备份的滚动处理函数
      } else if (shouldLoad(el)) { // 如果需要展示
        loading(el)
      }
    };

    window.addEventListener('scroll', g_listenerQueue[el.id]); // 添加全局滚动的监听事件
  } else {
    loading(el) // 图片在可视区，则直接进行展示
  }
}

function setDefSrc(defSrcConfig) {
  if (defSrcConfig) {
    if (Object.prototype.toString.call(defSrcConfig) === '[object Object]') {
      g_defSrc = Object.assign({}, defSrcConfig);
    } else {
      throw new Error('default src config should be object!');
    }
  }
}

export const ImgLazyLoader = {
  install(Vue, options) {
    setDefSrc(options.defSrcConfig);

    Vue.directive('img-lazy-loader', {
      bind(el, binding) {
        el.src = g_defSrc[binding.arg]; // 设置图片地址为默认地址
      },
      inserted(el, binding) {
        // 如果图片的src不为空
        if (binding.value && binding.value.trim()) {
          initImgLoad(el, binding);
        }
      },
      update(el, binding) {
        // 如果图片的src不为空
        if (binding.value && binding.value.trim()) {
          initImgLoad(el, binding);
        }
      }
    })
  }
}
