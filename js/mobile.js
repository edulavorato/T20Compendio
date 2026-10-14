/* Mobile navigation and accessible labels for wide tables. */
const mobileMenuButton=document.getElementById('mobileMenuToggle'),primaryNav=document.getElementById('primaryNavigation');
mobileMenuButton.onclick=()=>{const open=primaryNav.classList.toggle('is-mobile-open');mobileMenuButton.setAttribute('aria-expanded',String(open));};
primaryNav.addEventListener('click',e=>{if(e.target.closest('button')&&e.target!==mobileMenuButton){primaryNav.classList.remove('is-mobile-open');mobileMenuButton.setAttribute('aria-expanded','false');}});
function labelResponsiveTables(){for(const table of document.querySelectorAll('#detail table,#builder table')){const heads=[...table.querySelectorAll('thead tr:first-child th')];if(heads.length<=2)continue;table.classList.add('mobile-records');for(const tr of table.querySelectorAll('tbody tr'))for(const [i,td] of [...tr.children].entries())if(!td.hasAttribute('colspan'))td.dataset.label=heads[i]?.textContent.trim()||'';}}
let tableFrame;new MutationObserver(records=>{if(records.some(r=>r.type==='childList')){cancelAnimationFrame(tableFrame);tableFrame=requestAnimationFrame(labelResponsiveTables);}}).observe(document.body,{childList:true,subtree:true});labelResponsiveTables();
// After choosing a step, bring its form into view on small screens.
document.addEventListener('click',event=>{if(innerWidth<=700&&event.target.closest('.builder-steps button'))requestAnimationFrame(()=>document.getElementById('builderStageHeading')?.scrollIntoView({block:'start',behavior:'instant'}));});
