
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('[data-nav]'),menu=document.querySelector('[data-nav-toggle]');
 menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));menu.textContent=o?'Close':'Menu'});
 const theme=document.querySelector('[data-theme-toggle]'),key='multigain-theme';
 if(localStorage.getItem(key)==='dark')document.body.classList.add('theme-dark');
 theme?.addEventListener('click',()=>{document.body.classList.toggle('theme-dark');localStorage.setItem(key,document.body.classList.contains('theme-dark')?'dark':'light')});
 const toast=document.querySelector('[data-toast]');let timer;const notify=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2200)};
 const scopeKey='multigain-scope';let saved=JSON.parse(localStorage.getItem(scopeKey)||'[]');
 function renderSaved(){document.querySelectorAll('[data-save-service]').forEach(b=>{const n=b.dataset.serviceName;const on=saved.includes(n);b.closest('.service-card')?.classList.toggle('saved',on);b.textContent=on?'Saved ✓':'Save to scope +'});const c=document.querySelector('[data-scope-count]');if(c)c.textContent=`${saved.length} saved`}
 document.querySelectorAll('[data-save-service]').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.serviceName;saved=saved.includes(n)?saved.filter(x=>x!==n):[...saved,n];localStorage.setItem(scopeKey,JSON.stringify(saved));renderSaved();notify(saved.includes(n)?'Added to scope':'Removed from scope')}));
 document.querySelector('[data-clear-scope]')?.addEventListener('click',()=>{saved=[];localStorage.setItem(scopeKey,'[]');renderSaved();notify('Scope cleared')});renderSaved();
 const search=document.querySelector('[data-service-search]');let cat='All';function filter(){const q=(search?.value||'').toLowerCase();document.querySelectorAll('[data-service]').forEach(c=>{const okCat=cat==='All'||c.dataset.category===cat;const okQ=!q||c.textContent.toLowerCase().includes(q);c.classList.toggle('hidden',!(okCat&&okQ))})}
 search?.addEventListener('input',filter);document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));filter()}));
 const params=new URLSearchParams(location.search);if(params.get('cat')){const b=[...document.querySelectorAll('[data-filter]')].find(x=>x.dataset.filter===params.get('cat'));b?.click()}
 document.querySelectorAll('[data-demo-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const s=f.querySelector('.form-status');if(s)s.textContent='Demo only — no financial information was transmitted. Connect a secure production form/CRM before launch.';notify('Demo inquiry prepared — nothing was sent.')}));
 document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&d.parentElement?.classList.contains('accordion'))[...d.parentElement.children].filter(x=>x!==d&&x.tagName==='DETAILS').forEach(x=>x.open=false)}));
 const reveal=[...document.querySelectorAll('main > section')];reveal.forEach(x=>x.classList.add('reveal'));if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.05});reveal.forEach(x=>io.observe(x))}else reveal.forEach(x=>x.classList.add('visible'));
});
