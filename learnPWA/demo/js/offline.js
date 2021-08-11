 (function () {
  'use strict';

  var header = document.querySelector('header');
  var menuHeader = document.querySelector('.menu__header');

  //监听contentLoaded事件
  document.addEventListener('DOMContentLoaded', function(event) {
    //检查网络连接状态
    if (!navigator.onLine) {
      updateNetworkStatus();
    }

    window.addEventListener('online', updateNetworkStatus, false);
    window.addEventListener('offline', updateNetworkStatus, false);
  });

  //更新网络状态
  function updateNetworkStatus() {
    if (navigator.onLine) {
      header.classList.remove('app__offline');
      menuHeader.style.background = '#1E88E5'; 
    }
    else {
      toast('You are now offline..');
      header.classList.add('app__offline');
      menuHeader.style.background = '#9E9E9E';
    }
  }
})();