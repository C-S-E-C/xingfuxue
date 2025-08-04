barba.init({
  transitions: [{
    name: 'fade',
    leave(data) {
      return new Promise((resolve) => {
        data.current.container.style.transition = 'opacity 0.5s';
        data.current.container.style.opacity = 0;
        
        // 在过渡完成后 resolve
        setTimeout(resolve, 500); // 匹配CSS的持续时间
      });
    },
    enter(data) {
      data.next.container.style.opacity = 0;
      return new Promise((resolve) => {
        setTimeout(() => {
          data.next.container.style.transition = 'opacity 0.5s';
          data.next.container.style.opacity = 1;
          setTimeout(resolve, 500);
        }, 10); // 小延迟确保样式应用
      });
    }
  }]
});