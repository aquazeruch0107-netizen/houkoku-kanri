self.addEventListener('push', function(event) {
    var data = event.data ? event.data.json() : {};
    var title = data.title || '📊 報告アプリ';
    var options = {
        body: data.body || '新しいお知らせがあります',
        icon: '/icon-512.png',
        badge: '/icon-512.png',
        tag: data.tag || 'report-app',
        renotify: true
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].url.indexOf(self.location.origin) !== -1 && 'focus' in list[i]) return list[i].focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});

