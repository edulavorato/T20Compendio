const T20Migration=(()=>{
 function character(c,r){const ids=r.aliases_entradas||{},upgradeMaps=r.aliases_aprimoramentos||{},names=r.aliases_nomes||{},id=x=>ids[x]||x,tokens=x=>String(x).split(/([:|])/).map(id).join(''),unique=a=>[...new Set(a)];
 for(const key of ['raca','classe','origem','deus','poderRacial','poderLinhagem','armaSimples','armaMarcial','armaduraInicial'])if(typeof c[key]==='string')c[key]=id(c[key]);
 for(const key of ['magias','magiasRaciais','magiaLinhagem','memorizadas','concedidos','magiasCopiadas','trajetoria','distincoes'])if(Array.isArray(c[key]))c[key]=key==='trajetoria'?c[key].map(tokens):unique(c[key].map(tokens));
 for(const key of ['evolucao','magiasClasse','escolasClasse','magiaFontes','aprimMetamagia','aprimMetamagiaModos'])if(Array.isArray(c[key]))c[key]=unique(c[key].map(tokens));
 if(Array.isArray(c.aprimoramentos)){const merged=new Map();for(const value of c.aprimoramentos){const [old,index,qty]=value.split(':'),next=upgradeMaps[old]?.[index]??index,key=id(old)+':'+next;merged.set(key,Math.max(merged.get(key)||0,Number(qty)||0));}c.aprimoramentos=[...merged].filter(([,q])=>q>0).map(([key,q])=>key+':'+q);}
 if(Array.isArray(c.escolhasHabilidades))c.escolhasHabilidades=unique(c.escolhasHabilidades.map(value=>{const [level,key,...rest]=value.split(':'),chosen=rest.join(':'),aliases=/magia|totem/i.test(key)?names.Magias:/arma/i.test(key)?names.Equipamentos:null;return level+':'+key+':'+(aliases?.[chosen]||chosen);}));
 if(Array.isArray(c.originChoices))c.originChoices=unique(c.originChoices.map(value=>value.startsWith('poder:')?'poder:'+(names.Poderes?.[value.slice(6)]||value.slice(6)):value));
 for(const key of ['inventario','escolhasEquipamento'])if(Array.isArray(c[key]))c[key]=c[key].map(value=>{try{const record=JSON.parse(value),old=record.ref?.split(':').at(-1),map=upgradeMaps[old];if(map&&Array.isArray(record.potionUpgrades)){const next=[];record.potionUpgrades.forEach((qty,i)=>next[map[i]??i]=qty);record.potionUpgrades=next;}if(typeof record.ref==='string')record.ref=tokens(record.ref);return JSON.stringify(record);}catch{return value;}});
 return c;
 }
 return {character};
})();
