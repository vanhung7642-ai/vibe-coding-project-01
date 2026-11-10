const path = window.location.pathname.replace(/\\/g, '/');
const isEnglish = /\/en\//.test(path);
const currentPage = path.split('/').pop() || 'index.html';
const root = isEnglish ? '../' : '';

const labels = isEnglish ? {
  home:'Home', about:'About us', businesses:'Businesses', capabilities:'Capabilities', projects:'Projects', news:'News', careers:'Careers', contact:'Contact', connect:'Contact us', fields:'Business areas', price:'Price list', network:'Network', gallery:'Gallery', chat:'Live chat', chatTitle:'Start a conversation', name:'Full name', contactField:'Phone or email', start:'Start chat', greeting:'Thank you. Our team will be with you shortly.', placeholder:'Type your message...', reply:'Thank you for your message. A Hung Vuong advisor will contact you soon.', send:'Send', close:'Close', required:'Please complete both required fields.'
} : {
  home:'Trang chủ', about:'Về Hùng Vương', businesses:'Lĩnh vực', capabilities:'Năng lực', projects:'Dự án', news:'Tin tức', careers:'Tuyển dụng', contact:'Liên hệ', connect:'Kết nối với chúng tôi', fields:'Lĩnh vực hoạt động', price:'Bảng giá', network:'Mạng lưới', gallery:'Thư viện', chat:'Live Chat', chatTitle:'Bắt đầu trò chuyện', name:'Họ và tên', contactField:'Số điện thoại hoặc Email', start:'Bắt đầu trò chuyện', greeting:'Cảm ơn bạn. Đội ngũ Hùng Vương sẽ hỗ trợ bạn trong thời gian sớm nhất.', placeholder:'Nhập câu hỏi cần hỗ trợ...', reply:'Cảm ơn bạn đã gửi thông tin. Chuyên viên Hùng Vương sẽ liên hệ với bạn trong thời gian sớm nhất.', send:'Gửi', close:'Đóng', required:'Vui lòng điền đầy đủ các trường bắt buộc.'
};

const icon = {
  arrow:'<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  price:'<svg viewBox="0 0 24 24"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5zM12 8v8M8.5 10.5h7"/></svg>',
  network:'<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m10.5 7-4 8M13.5 7l4 8M7.5 18h9"/></svg>',
  gallery:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="8" cy="9" r="1.5"/><path d="m4 17 5-5 3 3 2-2 6 5"/></svg>',
  contact:'<svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  capabilities:'<svg viewBox="0 0 24 24"><path d="M4 19h16M6 16V9M12 16V5M18 16v-7"/></svg>',
  chat:'<svg viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.4-.7L4 20l1.6-3.7A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>',
  close:'<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  menu:'<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
};

const navItems = [['index.html',labels.home],['about.html',labels.about],['businesses.html',labels.businesses],['capabilities.html',labels.capabilities],['projects.html',labels.projects],['news.html',labels.news],['careers.html',labels.careers],['contact.html',labels.contact]];
const active = file => currentPage === file || (currentPage === '' && file === 'index.html');

function renderHeader() {
  const oldHeader = document.querySelector('header');
  if (!oldHeader) return;
  if (oldHeader.querySelector('.nav')) {
    const menu = oldHeader.querySelector('.menu');
    const nav = oldHeader.querySelector('nav');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.addEventListener('click', () => {
      const open = nav?.classList.toggle('open') ?? false;
      oldHeader.classList.toggle('menu-open', open);
      menu?.setAttribute('aria-expanded', String(open));
      const english = document.documentElement.lang === 'en';
      menu?.setAttribute('aria-label', open ? (english ? 'Close menu' : 'Đóng menu') : (english ? 'Open menu' : 'Mở menu'));
      if (menu) menu.textContent = open ? '×' : '☰';
    });
    return;
  }
  const links = navItems.map(([file,label]) => `<a class="${active(file) ? 'active' : ''}" href="${root}${file}">${label}</a>`).join('');
  const viLink = isEnglish ? `../${currentPage}` : currentPage;
  const enLink = isEnglish ? currentPage : `en/${currentPage}`;
  const categories = isEnglish ? ['Precast concrete components','Construction','Quarries','Building materials'] : ['Cấu kiện bê tông đúc sẵn','Thi công công trình','Mỏ đá','Vật liệu xây dựng'];
  const ids = ['precast','construction','quarries','materials'];
  const mega = `<div class="mega-menu"><div class="mega-inner">${categories.map((label,index) => `<div class="mega-column"><span>0${index + 1}</span><a href="${root}businesses.html#${ids[index]}">${label}</a><p>${isEnglish ? 'Engineered solutions for modern infrastructure.' : 'Giải pháp cho hạ tầng hiện đại.'}</p></div>`).join('')}</div></div>`;
  const header = document.createElement('header');
  header.className = `shared-header ${active('index.html') ? 'home-header' : ''}`;
  const languageSwitcher = active('index.html') ? '' : `<span class="lang-switch"><a class="${!isEnglish ? 'active' : ''}" href="${viLink}">VI</a> / <a class="${isEnglish ? 'active' : ''}" href="${enLink}">EN</a></span>`;
  header.innerHTML = `<div class="header-inner nav"><a href="${root}index.html" class="brand"><img class="header-logo" src="${root}assets/images/hung-vuong-logo-full.png" alt="Hùng Vương Construction"></a><nav>${links}</nav><div class="nav-actions">${languageSwitcher}<a href="${root}contact.html" class="btn nav-contact">${labels.connect} ${icon.arrow}</a><button class="menu" aria-label="Menu">${icon.menu}</button></div></div>${mega}`;
  oldHeader.replaceWith(header);
  const businessTrigger = header.querySelector('nav a[href$="businesses.html"]');
  businessTrigger?.addEventListener('click', event => {
    if (window.innerWidth <= 800) {
      event.preventDefault();
      header.classList.toggle('mega-open');
    }
  });
  header.querySelector('.menu')?.addEventListener('click', () => {
    header.classList.toggle('menu-open');
    header.querySelector('nav')?.classList.toggle('open');
  });
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 24), {passive:true});
}

function renderFloatingActions() {
  const group = document.createElement('aside');
  group.className = 'floating-actions';
  group.innerHTML = `<a href="${root}businesses.html" class="floating-action" data-tooltip="${labels.fields}">${icon.network}<span>${labels.fields}</span></a><a href="${root}capabilities.html" class="floating-action" data-tooltip="${labels.capabilities}">${icon.capabilities}<span>${labels.capabilities}</span></a><a href="${root}projects.html" class="floating-action" data-tooltip="${labels.projects}">${icon.gallery}<span>${labels.projects}</span></a><a href="${root}contact.html" class="floating-action" data-tooltip="${labels.contact}">${icon.contact}<span>${labels.contact}</span></a>`;
  document.body.appendChild(group);
}

function normalizeInternalLinks() {
  if (!isEnglish && currentPage === 'index.html') {
    document.querySelectorAll('a[href="#about"]').forEach(link => { link.href = 'about.html'; });
    document.querySelectorAll('a[href="#projects"]').forEach(link => { link.href = 'projects.html'; });
    document.querySelector('.intro-copy a[href="#contact"]')?.setAttribute('href', 'about.html');
    document.querySelector('.projects .section-head a[href="#contact"]')?.setAttribute('href', 'projects.html');
  }
}

function renderChat() {
  const launcher = document.createElement('button');
  launcher.className = 'chat-launcher chat-trigger';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', labels.chat);
  launcher.setAttribute('data-tooltip', labels.chat);
  launcher.innerHTML = `${icon.chat}<span>${labels.chat}</span>`;
  document.body.appendChild(launcher);
  const widget = document.createElement('section');
  widget.className = 'chat-widget';
  widget.innerHTML = `<div class="chat-head"><div><span class="chat-status"></span><strong>${labels.chat}</strong><small>Hung Vuong Construction</small></div><button class="chat-close" aria-label="${labels.close}">${icon.close}</button></div><div class="chat-body"><form class="chat-form"><p>${labels.chatTitle}</p><label>${labels.name} *<input name="name" required autocomplete="name"></label><label>${labels.contactField} *<input name="contact" required></label><p class="chat-error" role="alert">${labels.required}</p><button class="btn" type="submit">${labels.start} ${icon.arrow}</button></form><div class="chat-conversation"><div class="chat-messages"><div class="chat-bubble assistant">${labels.greeting}</div></div><form class="chat-message-form"><input name="message" required placeholder="${labels.placeholder}" autocomplete="off"><button aria-label="${labels.send}" type="submit">${icon.arrow}</button></form></div></div>`;
  document.body.appendChild(widget);
  document.querySelectorAll('.chat-trigger').forEach(button => button.addEventListener('click', () => widget.classList.add('open')));
  widget.querySelector('.chat-close')?.addEventListener('click', () => widget.classList.remove('open'));
  widget.querySelector('.chat-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.querySelector('.chat-error').classList.add('show'); form.reportValidity(); return; }
    form.querySelector('.chat-error').classList.remove('show');
    widget.classList.add('started');
    widget.querySelector('.chat-conversation input')?.focus();
  });
  widget.querySelector('.chat-message-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('input');
    const text = input.value.trim();
    if (!text) return;
    const messages = widget.querySelector('.chat-messages');
    messages.insertAdjacentHTML('beforeend', `<div class="chat-bubble user">${text.replace(/[&<>]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]))}</div>`);
    input.value = '';
    setTimeout(() => messages.insertAdjacentHTML('beforeend', `<div class="chat-bubble assistant">${labels.reply}</div>`), 350);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFloatingActions();
  normalizeInternalLinks();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
});
document.addEventListener('DOMContentLoaded', () => {
  if (currentPage === 'businesses.html') ['precast','construction','quarries','materials'].forEach((id,index) => document.querySelectorAll('.business-card,.card')[index]?.setAttribute('id', id));
  if (currentPage === 'projects.html') document.querySelectorAll('.project,.card').forEach((card,index) => card.setAttribute('id', `project-${index + 1}`));
  document.querySelector('.shared-header')?.addEventListener('mouseleave', () => { if (window.innerWidth > 800) document.querySelector('.shared-header')?.classList.remove('mega-open'); });
});
