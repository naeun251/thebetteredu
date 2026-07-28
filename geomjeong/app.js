/* 더나은에듀 · 검정고시 — 공용 스크립트 */
(function(){
  // 스크롤 시 헤더 배경 표시
  var hd=document.getElementById('hd');
  if(hd){
    var onScroll=function(){hd.classList.toggle('scrolled',window.scrollY>40)};
    addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }
  // 스크롤 등장 애니메이션
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
  }else{
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')});
  }
  // 합격후기 필터 탭
  var grid=document.getElementById('revGrid');
  if(grid){
    document.querySelectorAll('.rev-tab').forEach(function(tab){
      tab.addEventListener('click',function(){
        document.querySelectorAll('.rev-tab').forEach(function(t){t.classList.remove('on')});
        tab.classList.add('on');
        var f=tab.getAttribute('data-filter');
        grid.querySelectorAll('.rcard').forEach(function(c){
          c.style.display=(f==='all'||c.classList.contains(f))?'':'none';
        });
      });
    });
  }
})();
