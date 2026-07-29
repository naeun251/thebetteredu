(function () {
  const style = document.createElement('style');
  style.textContent = `
    .fcta-wrap {
      position: fixed;
      bottom: 24px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-end;
    }
    .fcta-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 20px;
      border-radius: 999px;
      font-family: 'PretendardVariable','Pretendard',-apple-system,sans-serif;
      font-weight: 700;
      font-size: 14.5px;
      text-decoration: none;
      white-space: nowrap;
      box-shadow: 0 4px 18px rgba(0,0,0,0.22);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      line-height: 1;
    }
    .fcta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0,0,0,0.28);
    }
    .fcta-kakao {
      background: #FEE500;
      color: #1a1a1a;
    }
    .fcta-apply {
      background: #FF6B52;
      color: #ffffff;
    }
    .fcta-tel {
      background: #2BAE66;
      color: #ffffff;
    }
    .fcta-icon {
      font-size: 16px;
      flex: none;
    }
    @media (max-width: 720px) {
      .fcta-wrap {
        bottom: 14px;
        right: 12px;
        gap: 9px;
      }
      /* 모바일: 화면을 벗어나지 않게 아이콘 원형 버튼으로 컴팩트하게 */
      .fcta-btn {
        width: 52px;
        height: 52px;
        padding: 0;
        gap: 0;
        border-radius: 50%;
        justify-content: center;
        font-size: 0;
      }
      .fcta-icon {
        font-size: 23px;
      }
    }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'fcta-wrap';
  wrap.innerHTML = `
    <a href="https://open.kakao.com/o/svHm7W8b" target="_blank" rel="noopener" class="fcta-btn fcta-kakao">
      <span class="fcta-icon">💬</span> 카카오톡 상담
    </a>
    <a href="/#apply" class="fcta-btn fcta-apply">
      <span class="fcta-icon">✨</span> 무료 상담 신청
    </a>
    <a href="tel:010-6832-1994" class="fcta-btn fcta-tel">
      <span class="fcta-icon">📞</span> 전화상담
    </a>
  `;
  document.body.appendChild(wrap);
})();
