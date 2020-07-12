const $html = document.querySelector('html');

export const modal = {
  bind: function(el){
    $html.style.overflowY = 'hidden';
  },
  unbind: function(){
    $html.style.overflowY = 'auto';
  }
};