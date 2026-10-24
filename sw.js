const V='chaekgyeol-v10';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','./index.html'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>hit);
    return e.request.mode==='navigate'?net:(hit||net);
  }));
});
