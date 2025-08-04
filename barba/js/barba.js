barba.init({
  transitions: [{
    name: 'default-transition',
    leave(data) {
      // create your stunning leave animation here
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.3
      });
    },
    enter(data) {
      // create your amazing enter animation here
      return gsap.to(data.next.container, {
        opacity: 0,
        duration: 0.3
      });
    }
  }]
});