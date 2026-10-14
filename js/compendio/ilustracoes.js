const artSelections=new Map();let artEntry=null,artReturnFocus=null;
function artworkItems(e){return (e?.ilustracoes||[]).filter(i=>DATABASE.ilustracoes?.[i.id])}
function artworkCaption(item){const a=DATABASE.ilustracoes[item.id];return item.legenda+' · '+a.fonte+' · p. '+a.pagina}
function artworkHtml(e){
 const items=artworkItems(e);if(!items.length)return '';
 const index=Math.min(artSelections.get(e.id)||0,items.length-1),item=items[index],a=DATABASE.ilustracoes[item.id];
 const first=e.estrutura?.descricao?.find(p=>p.trim())||'';let intro=first.length>340?first.slice(0,340).replace(/\s+\S*$/,'')+'…':first;
 const heading=e.categoria==='Raças'?'Sobre esta raça':'Sobre esta classe';
 return '<section class="entry-art" aria-label="Ilustrações da entrada"><div class="art-intro"><p class="art-eyebrow">Ilustração oficial</p><h3>'+heading+'</h3>'+(intro?'<p>'+esc(intro)+'</p>':'')+'<p class="art-hint">Clique na arte para ampliar.'+(items.length>1?' '+items.length+' ilustrações disponíveis.':'')+'</p><p class="art-credit">Créditos artísticos no expediente do livro.</p></div><div class="art-gallery"><figure><button id="artZoom" class="art-zoom" aria-label="Ampliar ilustração: '+esc(item.legenda)+'"><img id="entryArtImage" src="'+a.dados+'" alt="'+esc(item.legenda)+'" width="'+a.largura+'" height="'+a.altura+'" decoding="async"></button><figcaption id="entryArtCaption">'+esc(artworkCaption(item))+'</figcaption></figure>'+(items.length>1?'<div class="art-thumbs" aria-label="Escolher ilustração">'+items.map((i,j)=>{const a=DATABASE.ilustracoes[i.id];return '<button class="art-thumb" data-art-index="'+j+'" aria-label="Ver ilustração '+(j+1)+': '+esc(i.legenda)+'" aria-pressed="'+(j===index)+'"><img src="'+a.dados+'" alt="" loading="lazy" decoding="async" width="48" height="54"></button>'}).join('')+'</div>':'')+'</div></section>';
}
function chooseArtwork(e,index){
 const items=artworkItems(e);if(!items.length)return;index=(index+items.length)%items.length;artSelections.set(e.id,index);const item=items[index],a=DATABASE.ilustracoes[item.id];
 const im=$('entryArtImage');if(im){im.src=a.dados;im.alt=item.legenda;im.width=a.largura;im.height=a.altura;$('entryArtCaption').textContent=artworkCaption(item);$('artZoom').setAttribute('aria-label','Ampliar ilustração: '+item.legenda)}
 for(const b of $('detail').querySelectorAll?.('.art-thumb')||[])b.setAttribute('aria-pressed',String(Number(b.dataset.artIndex)===index));
 if($('artDialog').open)updateArtDialog(e,index);
}
function updateArtDialog(e,index){
 const items=artworkItems(e),item=items[index],a=DATABASE.ilustracoes[item.id];$('artDialogImage').src=a.dados;$('artDialogImage').alt=item.legenda;$('artDialogCaption').textContent=artworkCaption(item)+'. '+a.credito;
 $('artPosition').textContent=(index+1)+' / '+items.length;$('artPrevious').hidden=items.length<2;$('artNext').hidden=items.length<2;
}
function openArtwork(e){
 artEntry=e;artReturnFocus=document.activeElement;const items=artworkItems(e);if(!items.length)return;const index=artSelections.get(e.id)||0;updateArtDialog(e,index);$('artDialog').showModal();
}
function bindArtwork(e){
 if(!$('artZoom'))return;$('artZoom').onclick=()=>openArtwork(e);
 for(const b of $('detail').querySelectorAll?.('.art-thumb')||[])b.onclick=()=>chooseArtwork(e,Number(b.dataset.artIndex));
}
function bindArtDialog(){
 const dialog=$('artDialog');if(!dialog)return;
 $('closeArt').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>{artEntry=null;if(artReturnFocus?.isConnected)artReturnFocus.focus?.()});
 $('artPrevious').onclick=()=>{if(artEntry)chooseArtwork(artEntry,(artSelections.get(artEntry.id)||0)-1)};
 $('artNext').onclick=()=>{if(artEntry)chooseArtwork(artEntry,(artSelections.get(artEntry.id)||0)+1)};
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();if(artEntry)chooseArtwork(artEntry,(artSelections.get(artEntry.id)||0)+(event.key==='ArrowRight'?1:-1))}});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
}
