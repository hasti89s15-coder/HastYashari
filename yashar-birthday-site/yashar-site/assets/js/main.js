(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const entry = $('#entry-screen');
  const shell = $('#site-shell');
  const enterButton = $('#enter-button');
  const teaseButton = $('#tease-button');
  const teaseMessage = $('#tease-message');
  const toast = $('#toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function makeSparkles(x, y, amount = 14) {
    const layer = $('#sparkle-layer');
    if (!layer) return;
    const symbols = ['♡', '✦', '✧', '♥', '✨', '💗'];
    for (let i = 0; i < amount; i++) {
      const item = document.createElement('span');
      item.className = 'sparkle';
      item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      item.style.left = `${x + (Math.random() - .5) * 90}px`;
      item.style.top = `${y + (Math.random() - .5) * 30}px`;
      item.style.setProperty('--dx', `${(Math.random() - .5) * 150}px`);
      item.style.animationDelay = `${Math.random() * .22}s`;
      item.style.color = ['#ff4f83', '#e4a72c', '#c64d91', '#ff8da9'][Math.floor(Math.random() * 4)];
      layer.appendChild(item);
      item.addEventListener('animationend', () => item.remove(), { once: true });
    }
  }

  function celebrate() {
    makeSparkles(window.innerWidth / 2, window.innerHeight / 2, 34);
    showToast('یه عالمه عشق و ذوق برای نینیییی! 💗✨');
  }

  enterButton?.addEventListener('click', (event) => {
    makeSparkles(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 28);
    entry?.classList.add('is-gone');
    shell?.removeAttribute('inert');
    shell?.classList.add('is-ready');
    document.body.classList.remove('locked');
    window.setTimeout(() => { if (entry) entry.hidden = true; }, 750);
    window.setTimeout(() => showToast('به دنیای کوچولوی خودت خوش اومدی، نینی جانم! 🫂'), 650);
  });

  teaseButton?.addEventListener('click', (event) => {
    const replies = [
      'اون‌وقت با قلب صورتی و چشم‌های اشکی میام دنبالت! 🥹💗',
      'اون‌وقت می‌گم: نینییییی، من این همه عشق رو کجا بذارم پس؟! 😭💘',
      'اون‌وقت دکمه رو دوباره می‌زنم تا بالاخره بگی آره! 😼💕'
    ];
    if (teaseMessage) teaseMessage.textContent = replies[Math.floor(Math.random() * replies.length)];
    makeSparkles(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 10);
  });

  $('#sprinkle-button')?.addEventListener('click', celebrate);

  const challengeCopy = { 
    smile: ['همین الان یه لبخند گنده بزن؛ آره همون‌جوری که لپای خوشمزت بالا می‌ره! 😭💗', 'مأموریت: ۵ ثانیه به چیزی فکر کن که خوشحالت می‌کنه. من؟ حیحیحیحیییییی! 😌'],
    hug: ['دست‌هات رو دور خودت حلقه کن؛ این یه بغلِ مجازیِ محکم از طرف هستیه. تا وقتی دلت آروم بشه 🫂💞', 'طبق دستور رئیسِ بخشِ عشق: یک بغلِ طولانی لازم است. اعتراض پذیرفته نمی‌شود! 😤🫂'],
    kiss: ['یک بوسِ مجازی روی پیشونیِ نینیِ عزیزم! موووچ 😚💋', 'این کارت شامل ۱۰۰۰ بوسِ قابل تمدید برای یاشار است. استفاده‌ی نامحدود! 💋💗'],
    dance: ['قانون این مرحله: یه حرکت رقصِ خنده‌دار ناناااای کننن نینینیثث🕺🏻😂', 'نینی جانم، لطفاً با آهنگ «تو که ناز دوست داری میخوای برات ناز کنم» سه ثانیه برقص! 🎉😼']
  };
  $$('.challenge-card').forEach(card => {
    card.addEventListener('click', (event) => {
      const options = challengeCopy[card.dataset.challenge];
      const result = $('#challenge-result');
      if (!options || !result) return;
      const text = options[Math.floor(Math.random() * options.length)];
      result.innerHTML = `<span class="result-heart" aria-hidden="true">♥</span><p></p>`;
      $('p', result).textContent = text;
      makeSparkles(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 12);
    });
  });

  $('#final-surprise')?.addEventListener('click', (event) => {
    const message = $('#final-message');
    if (!message) return;
    message.hidden = false;
    event.currentTarget.textContent = 'سورپرایز باز شد! 💗';
    event.currentTarget.disabled = true;
    makeSparkles(window.innerWidth / 2, window.innerHeight * .7, 28);
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // جلوه‌ی کوچک روی کلیک/لمس، بدون دست‌کاری کلیک لینک‌ها یا دکمه‌ها
  document.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, a')) makeSparkles(event.clientX, event.clientY, 5);
  }, { passive: true });

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          item.target.classList.add('visible');
          observer.unobserve(item.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }
})();
