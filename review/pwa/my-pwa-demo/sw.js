// 导入
self.importScripts('data/games.js')

let cacheName = ''
let appShellFiles = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
]

let gamesImages = []
for (let i =0; i < games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug+'.jpg')
}

let contentToCache = appShellFiles.concat(gamesImages)

// 安装
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install. SW安装')
  e.waitUntil(
    cache.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content 缓存所有, app shell 和内容')
      return cache.addAll(contentToCache)
    })
  )
})

// fetch
self.addEventListener('fetch',  (e) => {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
})