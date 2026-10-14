/* Loads relative URLs: works at a domain root and under /repository/. */
(async function start(){
 const status=document.createElement('section');status.className='loading-status';status.setAttribute('role','status');status.textContent='Carregando o compêndio…';document.body.prepend(status);
 const surfaces=[...document.body.children].filter(e=>e!==status&&e.tagName!=='SCRIPT');surfaces.forEach(e=>e.inert=true);
 const loadJSON=async path=>{const response=await fetch(path);if(!response.ok)throw new Error('Não foi possível carregar '+path+' ('+response.status+').');return response.json();};
 const loadScript=path=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=path;s.onload=resolve;s.onerror=()=>reject(new Error('Não foi possível carregar '+path));document.body.append(s);});
 const encodeBytes=bytes=>{let text='';for(let i=0;i<bytes.length;i+=32768)text+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(text);};
 const loadBinary=async path=>{const res=await fetch(path);if(!res.ok)throw new Error('Arquivo indisponível: '+path);return encodeBytes(new Uint8Array(await res.arrayBuffer()));};
 try{
  if(location.protocol==='file:')throw new Error('Esta versão é para hospedagem. Para testar no computador, siga o LEIA-ME e abra pelo servidor local.');
  const config=await loadJSON('assets/data/carregamento.json');
  const [meta,books,ghanor,rules]=await Promise.all([loadJSON('assets/data/manifesto.json'),Promise.all(config.dados.map(loadJSON)),loadJSON('assets/data/ghanor-original.json'),loadJSON('assets/data/regras-criador.json')]);
  window.DATABASE={...meta,entradas:books.flatMap(b=>b.entradas),paginas:books.flatMap(b=>b.paginas),ghanor_entradas:ghanor};window.T20CreatorRules=rules;
  // PDF assets are loaded only when the player asks for an editable PDF.
  window.T20OfficialTemplate='';window.T20PdfFonts={};let pdfPromise;
  window.loadT20PdfAssets=()=>pdfPromise??=(async()=>{const [template,regular,bold,serif]=await Promise.all([loadBinary('assets/pdf/ficha-t20-editavel.pdf'),loadBinary('assets/fontes/regular.ttf'),loadBinary('assets/fontes/bold.ttf'),loadBinary('assets/fontes/serif.ttf')]);window.T20OfficialTemplate=template;window.T20PdfFonts={regular,bold,serif};})();
  for(const path of config.scripts)await loadScript(path);
  await loadScript('assets/js/mobile.js');
  surfaces.forEach(e=>e.inert=false);status.remove();
 }catch(error){console.error(error);status.textContent=error.message+' Recarregue a página para tentar novamente.';const retry=document.createElement('button');retry.textContent='Tentar novamente';retry.onclick=()=>location.reload();status.append(retry);}
})();
