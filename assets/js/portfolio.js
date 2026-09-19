(() => {
  'use strict';
  // Thumbnails stay tied to the actual YouTube video, including future updates.
  document.querySelectorAll('img[data-thumb]').forEach(img => {
    const id = img.dataset.thumb;
    const fallbacks = [`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, `https://i.ytimg.com/vi/${id}/mqdefault.jpg`];
    if (img.dataset.fallback) fallbacks.push(img.dataset.fallback);
    const advance = () => {
      const next = fallbacks.shift();
      if (next) img.src = next;
      else { img.hidden = true; img.closest('.video-preview')?.classList.add('thumbnail-unavailable'); }
    };
    img.addEventListener('error', advance);
    img.addEventListener('load', () => { if (img.naturalWidth < 200) advance(); });
    if (img.complete && (!img.naturalWidth || img.naturalWidth < 200)) advance();
  });
  const dialog = document.querySelector('#video-dialog');
  const player = document.querySelector('#player');
  let opener;
  document.querySelectorAll('[data-video]').forEach(link => link.addEventListener('click', event => {
    if (!dialog?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener = link;
    const iframe = document.createElement('iframe');
    const start = Number(link.dataset.start) || 0;
    iframe.src = `https://www.youtube-nocookie.com/embed/${link.dataset.video}?autoplay=1&rel=0&start=${start}`;
    iframe.title = link.dataset.title || '프로젝트 영상';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(iframe);
    document.querySelector('#video-title').textContent = iframe.title;
    document.querySelector('#youtube-direct').href = link.href;
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  dialog?.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) { const b=dialog.getBoundingClientRect(); if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom) dialog.close(); } });
  dialog?.addEventListener('close', () => { player.replaceChildren(); document.body.style.overflow = ''; opener?.focus(); });
  const revealHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (target?.matches('details')) target.open = true;
    if (target?.matches('.project')) target.querySelector('details')?.setAttribute('open','');
  };
  window.addEventListener('hashchange', revealHash); revealHash();
  const search = document.querySelector('#archive-search');
  let filter = 'all';
  const applyFilters = () => {
    let count = 0;
    document.querySelectorAll('[data-project]').forEach(card => {
      const matches = (filter === 'all' || card.dataset.category === filter) && card.textContent.toLowerCase().includes((search?.value || '').trim().toLowerCase());
      card.hidden = !matches; if (matches) count++;
    });
    const label = document.querySelector('#archive-count');
    if (label) label.textContent = count ? `${count}개 프로젝트` : '일치하는 프로젝트가 없습니다. 다른 검색어를 입력해 주세요.';
  };
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed',String(b===button)));
    applyFilters();
  }));
  search?.addEventListener('input',applyFilters); if(search) applyFilters();
  let printState=[];
  window.addEventListener('beforeprint',()=>{ printState=[...document.querySelectorAll('details')].map(d=>[d,d.open]);printState.forEach(([d])=>d.open=true); });
  window.addEventListener('afterprint',()=>{printState.forEach(([d,open])=>d.open=open);});
  document.querySelectorAll('[data-print]').forEach(button=>button.addEventListener('click',()=>window.print()));
})();
