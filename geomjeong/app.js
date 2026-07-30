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
  // 모바일 메뉴 (네비 카테고리를 상담신청 옆 ☰ 버튼으로)
  var links=document.querySelector('nav.links');
  var bar=document.querySelector('header .bar');
  if(links&&bar&&!document.querySelector('.nav-toggle')){
    var toggle=document.createElement('button');
    toggle.className='nav-toggle';
    toggle.setAttribute('aria-label','메뉴 열기');
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML='☰';
    var cta=bar.querySelector('.btn');
    if(cta){bar.insertBefore(toggle,cta);}else{bar.appendChild(toggle);}
    var menu=document.createElement('nav');
    menu.className='mobile-menu';
    links.querySelectorAll('a').forEach(function(a){
      var c=document.createElement('a');
      c.href=a.getAttribute('href');
      c.textContent=a.textContent;
      menu.appendChild(c);
    });
    var applyBtn=document.createElement('a');
    applyBtn.href=(cta?cta.getAttribute('href'):'/#apply');
    applyBtn.className='mm-cta';
    applyBtn.textContent='무료 상담 신청';
    menu.appendChild(applyBtn);
    hd.appendChild(menu);
    toggle.addEventListener('click',function(){
      var open=menu.classList.toggle('open');
      toggle.classList.toggle('on',open);
      toggle.setAttribute('aria-expanded',open?'true':'false');
      toggle.innerHTML=open?'✕':'☰';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){menu.classList.remove('open');toggle.classList.remove('on');toggle.innerHTML='☰';toggle.setAttribute('aria-expanded','false');});
    });
  }

  // 히어로 지역 검색 — 입력 시 자동완성 목록
  var hs=document.querySelector('.hero-search');
  if(hs&&window.REGION_INDEX&&window.REGION_INDEX.length){
    var hinput=hs.querySelector('input');
    var sug=document.createElement('div'); sug.className='hs-suggest'; document.body.appendChild(sug);
    function place(){var r=hinput.getBoundingClientRect();sug.style.left=r.left+'px';sug.style.top=(r.bottom+8)+'px';sug.style.width=r.width+'px';}
    function draw(q){
      q=(q||'').trim().toLowerCase();
      sug.innerHTML='';
      if(!q){sug.classList.remove('open');return;}
      var m=window.REGION_INDEX.filter(function(r){return r.a.toLowerCase().indexOf(q)>-1});
      if(!m.length){sug.classList.remove('open');return;}
      m.slice(0,8).forEach(function(r){
        var a=document.createElement('a');
        a.href='/geomjeong/region/'+r.s+'.html';
        a.innerHTML='<span><b>'+r.n+'</b> 검정고시 과외</span><span class="g">'+r.g+'</span>';
        sug.appendChild(a);
      });
      if(m.length>8){
        var more=document.createElement('div'); more.className='hs-more';
        more.textContent='그 외 '+(m.length-8)+'곳 더… 지역 검색을 눌러 전체 보기';
        sug.appendChild(more);
      }
      place(); sug.classList.add('open');
    }
    hinput.addEventListener('input',function(){draw(hinput.value)});
    hinput.addEventListener('focus',function(){draw(hinput.value)});
    addEventListener('scroll',function(){sug.classList.remove('open')},{passive:true});
    addEventListener('resize',function(){if(sug.classList.contains('open'))place()});
    document.addEventListener('click',function(e){if(!hs.contains(e.target)&&!sug.contains(e.target))sug.classList.remove('open')});
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
