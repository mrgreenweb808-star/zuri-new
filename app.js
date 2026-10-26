const products=[
 ['Aurelia — Emerald','Peplum dress',6,'Dresses'],['Aurelia — Jewel','Peplum dress',7,'Dresses'],['Aurelia — Amethyst','Peplum dress',8,'Dresses'],['Midnight Tier — Ember Bloom','Tiered Ankara skirt',9,'Skirts'],['Midnight Tier — Lagoon Bloom','Tiered Ankara skirt',10,'Skirts'],['Midnight Tier — Sapphire Bloom','Tiered Ankara skirt',11,'Skirts'],['Midnight Tier — Emerald Nocturne','Tiered Ankara skirt',12,'Skirts'],['Kaleido Convertible Top','Teal Patchwork Ankara',13,'Tops','CAD $40.00'],['The Nkabom','Patchwork tunic dress',14,'Dresses'],['The Adjoa','Off-shoulder tiered dress',15,'Dresses'],['The Abeni','Tiered patchwork maxi skirt',16,'Skirts']
];
const photo=n=>`assets/original-${String(n).padStart(2,'0')}.jpg`;
const dialog=document.querySelector('#dialog'),content=document.querySelector('#dialog-content');
let filter='All',expanded=false;const selected=new Set();
function show(title,text){content.replaceChildren();const h=document.createElement('h2');h.textContent=title;const p=document.createElement('p');p.textContent=text;content.append(h,p);if(!dialog.open)dialog.showModal();}
document.querySelector('.close').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
function preview(p){show(p[0],`${p[1]}. ${p[4]||'Price to be confirmed'}. This is a product preview; sizes, availability, and checkout are not connected.`);const img=document.createElement('img');img.src=photo(p[2]);img.alt=p[0];content.prepend(img);const b=document.createElement('button');b.className='button';b.textContent=selected.has(p[0])?'Remove from your edit':'Add to your edit';b.onclick=()=>{selected.has(p[0])?selected.delete(p[0]):selected.add(p[0]);document.querySelector('#count').textContent=selected.size;b.textContent=selected.has(p[0])?'Remove from your edit':'Add to your edit';};content.append(b);}
function card(p){const a=document.createElement('article');a.className='product-card';a.innerHTML=`<div class="product-photo"><img src="${photo(p[2])}" alt="${p[0]} — ${p[1]}" loading="lazy"><button class="preview" aria-label="Preview ${p[0]}">Preview piece ↗</button></div><h3>${p[0]}</h3><p>${p[1]}</p><p class="price">${p[4]||'Price to be confirmed'}</p>`;a.querySelector('button').onclick=()=>preview(p);return a;}
function render(){const all=products.filter(p=>filter==='All'||p[3]===filter),visible=expanded?all:all.slice(0,6);document.querySelector('#products').replaceChildren(...visible.map(card));document.querySelector('#more').hidden=all.length<=6;document.querySelector('#more').style.display=all.length<=6?'none':'flex';document.querySelector('#more').textContent=expanded?'Show fewer pieces −':'Discover more pieces +';document.querySelector('#results').textContent=`Showing ${visible.length} of ${all.length} pieces`;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===filter);b.setAttribute('aria-pressed',String(b.dataset.filter===filter));});}
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;expanded=false;render();});
document.querySelectorAll('[data-filter-link]').forEach(a=>a.onclick=()=>{filter=a.dataset.filterLink;expanded=true;render();});
document.querySelector('#more').onclick=()=>{expanded=!expanded;render();};
document.querySelector('#favorites').replaceChildren(...[products[7],products[8],products[9],products[10],products[6]].map(card));
document.querySelector('.photo-strip').replaceChildren(...[24,22,19,26,20,27].map(n=>{const i=document.createElement('img');i.src=photo(n);i.alt='Zuri by Efua Ankara editorial look';i.loading='lazy';return i;}));
document.querySelector('#bag').onclick=()=>{show('Your edit',selected.size?'Your preview selection. No order has been placed.':'Add a piece from its preview to start your edit.');for(const name of selected){const b=document.createElement('button');b.className='button';b.textContent=name;b.onclick=()=>preview(products.find(p=>p[0]===name));content.append(b);}};
document.querySelector('#search-button').onclick=()=>{show('Find your expression','Search Zuri’s collection by name or category.');const input=document.createElement('input');input.className='search-input';input.type='search';input.placeholder='Try dresses, skirts, Aurelia…';input.setAttribute('aria-label','Search products');const results=document.createElement('div');results.className='search-results';input.oninput=()=>{const matches=products.filter(p=>p.join(' ').toLowerCase().includes(input.value.toLowerCase()));results.replaceChildren(...matches.map(p=>{const b=document.createElement('button');b.textContent=p[0];b.onclick=()=>preview(p);return b;}));if(!matches.length)results.textContent='No pieces found. Try another name or category.';};content.append(input,results);input.oninput();input.focus();};
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);};nav.querySelectorAll('a').forEach(a=>a.onclick=closeMenu);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const slides=[[1,'Coral kimono and vibrant Ankara triangle skirt'],[7,'Aurelia Jewel peplum dress'],[10,'Midnight Tier Lagoon Bloom skirt']];document.querySelectorAll('.slide').forEach(b=>b.onclick=()=>{const s=slides[Number(b.dataset.slide)],img=document.querySelector('#hero-photo');img.src=photo(s[0]);img.alt=s[1];document.querySelectorAll('.slide').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});});
document.querySelector('#newsletter').onsubmit=e=>{e.preventDefault();document.querySelector('#signup-status').textContent='Thank you for trying the signup. Demo only — your email has not been sent or saved.';};
document.querySelectorAll('[data-info]').forEach(b=>b.onclick=()=>show(b.dataset.info,`${b.dataset.info} details will be added when the approved information is available. This local demo does not connect to an external service.`));render();

// Reveal once as each section enters view; keep all content visible without JS.
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!motionPreference.matches){
 const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});
 },{threshold:0.08,rootMargin:'0px 0px -25px 0px'});
 document.querySelectorAll('.campaigns>a,.heading,.categories>a,.story-photo,.story-copy,.values article,.photo-strip,.newsletter>div,.newsletter form').forEach((element,index)=>{
  element.classList.add('reveal');
  element.style.setProperty('--reveal-delay',`${(index%3)*65}ms`);
  revealObserver.observe(element);
 });
 motionPreference.addEventListener('change',event=>{
  if(event.matches){revealObserver.disconnect();document.querySelectorAll('.reveal').forEach(element=>element.classList.add('is-visible'));}
 });
}
