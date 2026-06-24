self.addEventListener('push', function(event) {
    var data = event.data ? event.data.json() : {};
    var title = data.title || '📊 報告アプリ';
    var options = {
        body: data.body || '期限が近い報告があります',
        icon: '/icon-512.png',
        badge: '/icon-512.png',
        tag: 'report-reminder',
        renotify: true,
        actions: [
            { action: 'open', title: 'アプリを開く' },
            { action: 'dismiss', title: '閉じる' }
        ]
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    if (event.action === 'dismiss') return;
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].url.indexOf(self.location.origin) !== -1 && 'focus' in list[i]) {
                    return list[i].focus();
                }
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});

