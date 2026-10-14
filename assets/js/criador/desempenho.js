const T20Performance=(()=>{
 let cache=null;
 function run(fn){if(cache)return fn();cache=new WeakMap();try{return fn();}finally{cache=null;}}
 function memo(key,c,r,fn){if(!cache)return fn();let byRule=cache.get(c);if(!byRule){byRule=new WeakMap();cache.set(c,byRule);}let values=byRule.get(r);if(!values){values=new Map();byRule.set(r,values);}if(values.has(key))return values.get(key);const value=fn();values.set(key,value);return value;}
 return {run,memo};
})();
function bindDeferredCasting(){for(const el of document.querySelectorAll('[data-deferred-casting]')){const populate=()=>{const body=el.querySelector('.builder-feature-content');if(el.open&&!body.children.length){T20Performance.run(()=>{body.innerHTML=builderMagicUI();const states=builderDisclosureStates.get(builderRenderedContext);if(states)for(const detail of body.querySelectorAll('details')){const key=builderDisclosureKey(detail);if(states.has(key))detail.open=states.get(key);}bindBuilderMagic();});}};el.addEventListener('toggle',populate);populate();}}

// Converte somente referências conhecidas. Nome, notas e textos livres são preservados.
