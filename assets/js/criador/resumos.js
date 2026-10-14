const T20Summaries=(()=>{
 function power(p){const text=String(p.texto||'').replace(/\s+/g,' '),cost=text.match(/(?:gastar?|gasta|gastando|pagando|Custo:)\s*\+?(\d+)\s*PM/i),sentences=text.split(/(?<=[.!?])\s+/).filter(t=>!/^Pré-requisit/i.test(t));const numeric=sentences.filter(t=>/\bPM\b|[+−-]\d|\d+d\d|\bRD\b|\d+\s*(?:PV|PM|m\b|pontos|ataques|vez|rodada)/i.test(t));if(!numeric.length)return p.nome;let result=(numeric[0]||'').replace(/^Você (?:recebe|ganha|pode)\s*/i,'').replace(/Pré-requisitos?:.*$/i,'').trim();if(result.length>155){const end=result.slice(0,155).lastIndexOf(' ');result=result.slice(0,end)+'…';}if(cost&&!/PM/.test(result))result=cost[1]+' PM · '+result;return result?p.nome+': '+result:p.nome;}
 function spell(c,r,m){const p=T20Magic.profile(c,r,m);return m.nome+' · '+p.actual+' PM · CD '+p.cdTotal+(p.effectSummary?' · '+p.effectSummary:'')+(p.damage?.length?' · '+p.damage.join('; '):'')+(p.selected.length?' · '+p.selected.map(u=>(u.qty>1?u.qty+'× ':'')+(u.trick?'Truque':'+'+u.cost+' PM')).join(', '):'');}
 return {power,spell};
})();

// Efeitos numéricos independentes: nunca mistura dano, cura e PV temporários.
