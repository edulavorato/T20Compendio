// Navegação da proposta A. As regras permanecem nos dados existentes.
let mobileDetail=false,listReturnY=0,lastFilterContext='',outlineObserver=null;
let recentIds=[];try{const saved=T20SafeMode?[]:JSON.parse(localStorage.getItem('t20-recents')||'[]');recentIds=Array.isArray(saved)?[...new Set(saved.filter(x=>typeof x==='string').map(canonicalEntryId))].slice(0,6):[]}catch{}
function syncFilterChoices(){
 const context=compendiumWorld+'|'+category+'|'+$('mode').value;
 if(context!==lastFilterContext){
  lastFilterContext=context;
  const es=($('mode').value==='pages'?pageIndex:entryIndex).filter(e=>!category||e.categoria===category);
  for(const [id,key,label] of [['type','tipo','Todos os tipos'],['school','escola','Todas as escolas'],['nd','nd','Todos os NDs']]){
   const control=$(id),previous=control.value;control.replaceChildren();
   const values=[...new Set(es.flatMap(e=>entrySources(e).map(s=>key==='nd'?s.campos?.ND:s[key])).filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),'pt-BR',{numeric:true}));
   const first=document.createElement('option');first.value='';first.textContent=label;control.append(first);
   for(const value of values){const o=document.createElement('option');o.value=value;o.textContent=key==='nd'?'ND '+value:value;control.append(o)}
   control.value=values.includes(previous)?previous:'';
  }
 }
 $('circleField').hidden=!!category&&category!=='Magias';$('schoolField').hidden=!!category&&category!=='Magias';$('ndField').hidden=category!=='Ameaças';
 if(category&&category!=='Magias'){$('circle').value='';$('school').value=''}
 if(category!=='Ameaças')$('nd').value='';
}
function renderFilterChips(){
 $('activeFilters').replaceChildren();
 for(const [id,label] of [['source','Fonte'],['type','Tipo'],['circle','Círculo'],['school','Escola'],['nd','ND']]){
  const value=$(id).value;if(!value)continue;
  const text=id==='source'?(DATABASE.livros.find(b=>b.id===value)?.nome||value):id==='circle'?value+'º círculo':value;
  const b=button(text+' ×',()=>{$(id).value='';reset()});b.setAttribute('aria-label','Remover filtro '+label+': '+text);$('activeFilters').append(b);
 }
 if(onlyFavorites)$('activeFilters').append(button('Favoritos ×',()=>{onlyFavorites=false;reset()}));
}
function rememberEntry(e){
 if(homeMode)return;
 recentIds=[e.id,...recentIds.filter(id=>id!==e.id)].slice(0,6);
 try{if(!T20SafeMode)localStorage.setItem('t20-recents',JSON.stringify(recentIds))}catch{}
}
function openRecent(id){
 if(DATABASE.ghanor_entradas.some(e=>e.id===id))setCompendiumWorld('ghanor');id=canonicalEntryId(id);const e=entryIndex.find(e=>e.id===id)||pageIndex.find(e=>e.id===id);if(!e)return;
 goCategory(e.categoria);$('mode').value=e.status==='Consulta por página'?'pages':'entries';$('source').value=e.livro_id;$('search').value='';selected=id;page=0;mobileDetail=true;render();
 if(typeof window.scrollTo==='function'&&window.matchMedia?.('(max-width:760px)').matches)window.scrollTo({top:0});
}
function renderRecent(e){
 $('recentLinks').replaceChildren();
 const es=recentIds.filter(id=>id!==e?.id).map(id=>entryIndex.find(e=>e.id===id)||pageIndex.find(e=>e.id===id)).filter(Boolean).slice(0,4);
 for(const item of es){const b=button(item.nome,()=>openRecent(item.id));const s=document.createElement('small');s.textContent=item.categoria+' · '+(DATABASE.livros.find(x=>x.id===item.livro_id)?.sigla||'');b.append(s);$('recentLinks').append(b)}
 if(!es.length){const p=document.createElement('p');p.textContent='Suas últimas consultas aparecem aqui.';p.style.fontSize='11px';$('recentLinks').append(p)}
}
function jumpToSection(id){
 const target=$(id);if(!target)return;
 // Pode estar dentro de um grupo recolhido pelo próprio usuário.
 let p=target.parentElement;while(p&&p!==$('detail')){if(p.hidden)p.hidden=false;p=p.parentElement}
 target.scrollIntoView?.({behavior:window.matchMedia?.('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
 target.setAttribute('tabindex','-1');target.focus?.({preventScroll:true});
 for(const b of $('detail').querySelectorAll?.('.option-toggle')||[]){const group=b.closest('.option-group');const children=Array.from(group.children).filter(x=>x.classList.contains('subfeature'));const expanded=children.every(x=>!x.hidden);b.textContent=expanded?'Recolher opções':'Expandir opções';b.setAttribute('aria-expanded',String(expanded))}
}
function buildEntryNavigation(e){
 outlineObserver?.disconnect();$('tocLinks').replaceChildren();$('quickLinks').replaceChildren();$('mobileContents').replaceChildren();$('tocSearch').value='';
 const headings=Array.from($('detail').querySelectorAll?.('.formatted h3,.formatted h4,.formatted h5,.formatted h6')||[]);
 const headingBase=Math.min(...headings.map(h=>Number(h.tagName.slice(1))),4);
 headings.forEach((h,i)=>{
  h.id='entry-section-'+i;const depth=Math.min(3,Number(h.tagName.slice(1))-headingBase);
  const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;a.className='depth-'+depth;a.onclick=event=>{event?.preventDefault();jumpToSection(h.id)};$('tocLinks').append(a);
  const m=a.cloneNode(true);m.onclick=a.onclick;$('mobileContents').append(m);
  if((Number(h.tagName.slice(1))===3||h.textContent==='Descrição e história')&&$('quickLinks').children.length<9){const q=a.cloneNode(true);q.onclick=a.onclick;$('quickLinks').append(q)}
 });
 $('quickLinks').hidden=!$('quickLinks').children.length;$('tocSearch').hidden=headings.length<12;
 if(!headings.length){const a=document.createElement('a');a.textContent='Conteúdo da entrada';a.href='#detail';a.onclick=event=>{event?.preventDefault();$('detail').scrollIntoView?.({block:'start'})};$('tocLinks').append(a);const m=a.cloneNode(true);m.onclick=a.onclick;$('mobileContents').append(m)}
 if(typeof IntersectionObserver!=='undefined'){
  outlineObserver=new IntersectionObserver(entries=>{const first=entries.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!first)return;for(const a of $('tocLinks').children){const active=a.getAttribute('href')==='#'+first.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')}},{rootMargin:'-55px 0px -65% 0px'});
  headings.forEach(h=>outlineObserver.observe(h));
 }
 for(const group of $('detail').querySelectorAll?.('.option-group')||[]){
  const label=group.querySelector(':scope > .option-label');if(!label)continue;
  const children=Array.from(group.children).filter(x=>x.classList.contains('subfeature'));if(!children.length)continue;
  const toggle=button('Recolher opções',()=>{const collapse=toggle.getAttribute('aria-expanded')==='true';children.forEach(x=>x.hidden=collapse);toggle.textContent=collapse?'Expandir opções':'Recolher opções';toggle.setAttribute('aria-expanded',String(!collapse))});toggle.className='option-toggle';toggle.setAttribute('aria-expanded','true');label.append(toggle);
 }
 if($('backList'))$('backList').onclick=()=>{mobileDetail=false;syncNav();window.scrollTo?.({top:listReturnY})};
 $('tocSearch').oninput=()=>{const q=norm($('tocSearch').value);for(const a of $('tocLinks').children)a.hidden=!norm(a.textContent).includes(q)};
 renderRecent(e);
}

// Artes oficiais locais, uma cópia por imagem no banco de dados.
