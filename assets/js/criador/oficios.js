const T20Professions=(()=>{
 const examples=['Alquimista','Armeiro','Artesão','Cozinheiro','Alfaiate','Carpinteiro','Pedreiro','Ourives','Fazendeiro','Pescador','Estalajadeiro','Escriba','Escultor','Pintor','Engenhoqueiro','Minerador'];
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase(),is=s=>/^Ofício(?:\s*\([^)]+\))?$/.test(s),name=s=>String(s).match(/^Ofício\s*\(([^)]+)\)$/)?.[1]||'',base=s=>is(s)?'Ofício':s;
 function names(c){return [...new Set([...examples,...(c.oficiosExtra||[]),c.oficio].filter(Boolean))];}
 function expand(c,options){return options.flatMap(x=>x.value.replace(/^pericia:/,'')==='Ofício'?[x,...names(c).map(n=>({...x,value:(x.value.startsWith('pericia:')?'pericia:':'')+'Ofício ('+n+')',nome:'Ofício ('+n+')'}))]:[x]);}
 function all(c){return {...T20Builder.skills,...Object.fromEntries(names(c).map(n=>['Ofício ('+n+')','int']))};}
 function trained(c,n){const list=[...c.classeSkills,...c.intSkills,...c.racaSkills,...c.originChoices.filter(s=>s.startsWith('pericia:')).map(s=>s.slice(8)),...c.treinosNivel.filter(x=>Number(x.split(':')[0])<=n).map(s=>s.slice(s.indexOf(':')+1))];return list.filter(is).map(s=>name(s)||c.oficio).filter(Boolean);}
 function has(c,v,specialty){return Object.entries(v.skills).some(([s,x])=>x.treino&&is(s)&&normalize(name(s)||c.oficio)===normalize(specialty));}
 function skills(c,v,r){const basic=v.skills['Ofício'];if(!basic)return;const trainedNames=trained(c,v.n).concat((v.trained||[]).filter(is).map(s=>name(s)||c.oficio));for(const n of names(c)){const key='Ofício ('+n+')',row={...basic},trained=trainedNames.some(x=>normalize(x)===normalize(n));row.treino=trained;const grade=v.n>=15?6:v.n>=7?4:2;row.total=basic.total-(basic.treino?grade:0)+(trained?grade:0);row.explicacao=basic.explicacao.replace(/\d+ treino/,String(trained?grade:0)+' treino');for(const source of [v.itemEffects?.skills,v.activeEffects?.skills,v.originEffects?.skills])row.total+=(source?.[key]||0)-(source?.['Ofício']||0);if(typeof T20Racial!=='undefined'&&T20Racial.feature(c,r,'Vanguardista')&&normalize(T20Choices.get(c,1,'racialOficio'))===normalize(n)){row.total+=2;row.racialBonus=2;}row.itemBonus=v.itemEffects?.skills?.[key]||0;row.activeBonus=(v.activeEffects?.skills?.[key]||0)+(v.originEffects?.skills?.[key]||0);v.skills[key]=row;}
 
 // A ficha exibe apenas especializações adquiridas ou beneficiadas, mantendo o Ofício antigo compatível.
 for(const s of Object.keys(v.skills))if(name(s)&&!v.skills[s].treino&&!v.skills[s].itemBonus&&!v.skills[s].racialBonus&&!v.skills[s].activeBonus)delete v.skills[s];
 }
 function display(c,v){return Object.entries(v.skills).filter(([s])=>s!=='Ofício'||!Object.keys(v.skills).some(k=>name(k)));}return {display,examples,normalize,is,name,base,names,expand,all,trained,has,skills};
})();

// Fontes preservadas por ID; escolhas adicionais usam o mesmo armazenamento da ficha.
