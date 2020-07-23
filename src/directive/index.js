const $html = document.querySelector('html');

export const modal = {
  // componentUpdated: function(el){
  //   console.log('=====  componentUpdated  =====');
  //   // $html.style.overflowY = 'auto';
  // },
  // unbind: function(){
  //   console.log('=====  unbind  =====');
  //   // $html.style.overflowY = 'hidden';
  // },
  // update: function(){
  //   console.log('=====  update  =====');
  // },
  // inserted: function(){
  //   console.log('=====  inserted  =====');
  // },
  // bind: function(){
  //   console.log('=====  bind  =====');
  // },
};

export const lazyLoad = {
  inserted: el => {
    function loadImage() {
      const isImg = el.nodeName === 'IMG';
      if(isImg){
        el.src = el.dataset.src;
      }
    }

    function createObserver(){
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){  // 감지대상이 교차영역에 진입 할 경우
            setTimeout(() => {
              loadImage();  // 교챠영역 들어올 경우 이미지 로딩
            }, 3000)
            observer.unobserve(el); // 이미지 로딩 이후로는 관찰할 필요가 없다
          }
        });
      });

      observer.observe(el);
    }

    // 지원하지 않는 브라우저는 바로 이미지 로딩을 시켜주도록 호환성 체크
    window['IntersectionObserver'] ? createObserver() : loadImage();
  },
};