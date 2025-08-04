barba.init({
  transitions: [{
    name: 'fade',
    leave(data) {
      // 返回 GSAP 动画（自动返回 Promise）
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.5 // 明确设置持续时间
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: 0.5
      });
    }
  }]
});