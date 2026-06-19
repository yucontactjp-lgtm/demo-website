document.addEventListener('DOMContentLoaded', () => {
  // --- ルーティング (ページ切り替え) ---
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('nav a, .footer-links a[href^="#"]');
  const logoLink = document.querySelector('.logo');

  function navigate() {
    const hash = window.location.hash || '#home';
    let targetPage = document.querySelector(hash);
    
    if (!targetPage) {
      targetPage = document.getElementById('home');
    }

    // ページ表示切り替え
    pages.forEach(page => {
      page.classList.remove('active');
    });
    targetPage.classList.add('active');

    // ナビゲーションのアクティブクラス更新
    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // ページ最上部にスクロール
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // スクロールアニメーションの再評価
    observeScroll();

    // モバイルメニューを閉じる
    nav.classList.remove('active');
    burgerMenu.classList.remove('active');
  }

  window.addEventListener('hashchange', navigate);
  // 初回読み込み時のナビゲーション
  navigate();

  // --- ヘッダーのスクロール制御 ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- モバイルメニュー (バーガーメニュー) ---
  const burgerMenu = document.querySelector('.burger-menu');
  const nav = document.querySelector('nav');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // --- スクロールアニメーション (Intersection Observer) ---
  function observeScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // 一度表示されたら監視を解除
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      observer.observe(el);
    });
  }

  // --- 事例 (Case Studies) フィルター機能 ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // アクティブボタンの切り替え
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      caseCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 採用情報 (Careers) アコーディオン機能 ---
  const jobCards = document.querySelectorAll('.job-card');

  jobCards.forEach(card => {
    const header = card.querySelector('.job-header');
    header.addEventListener('click', (e) => {
      // 応募ボタンクリック時はアコーディオンを開閉しない
      if (e.target.classList.contains('btn-apply-trigger')) return;

      const isExpanded = card.classList.contains('expanded');
      
      // 他のカードを閉じる
      jobCards.forEach(c => c.classList.remove('expanded'));
      
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });

  // --- 応募用モーダル (Apply Modal) 制御 ---
  const applyModal = document.getElementById('apply-modal');
  const applyForm = document.getElementById('apply-form');
  const modalClose = applyModal.querySelector('.modal-close');
  const jobTitleInput = document.getElementById('job-title-input');
  const applyButtons = document.querySelectorAll('.btn-apply-trigger');

  applyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // アコーディオンのイベントを阻止
      const jobTitle = btn.getAttribute('data-job');
      jobTitleInput.value = jobTitle;
      
      // モーダル表示
      applyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeApplyModal() {
    applyModal.classList.remove('active');
    document.body.style.overflow = '';
    // フォームリセット
    applyForm.reset();
    applyForm.style.display = 'block';
    document.getElementById('apply-success').style.display = 'none';
  }

  modalClose.addEventListener('click', closeApplyModal);
  applyModal.querySelector('.modal-overlay').addEventListener('click', closeApplyModal);

  // 採用応募フォームの送信
  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // フェイクの送信処理
    applyForm.style.display = 'none';
    const successMsg = document.getElementById('apply-success');
    successMsg.style.display = 'block';
    
    // 入力データの簡易ログ出力 (モック)
    const formData = new FormData(applyForm);
    console.log('Application Submitted:', Object.fromEntries(formData));
  });

  // --- お問い合わせフォーム (Contact Form) 送信処理 ---
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // フェイクの送信処理
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';

      const formData = new FormData(contactForm);
      console.log('Contact Message Submitted:', Object.fromEntries(formData));
    });
  }
});
