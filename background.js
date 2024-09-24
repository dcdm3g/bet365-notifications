function createNotification({ title, message }) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'assets/icon-128x128.png',
    title,
    message,
  })
}

function handleMessage({ message, payload }) {
  const notificationFactoriesByMessage = {
    'user-not-authenticated': () => ({
      title: 'Faça login na Bet365',
      message: 'Parece que você não está autenticado na Bet365, faça login para receber notificações.',
    }),
    'notification-count-increased': (payload) => ({
      title: `${payload.count} ${payload.count === 1 ? 'notificação' : 'notificações'} na Bet365`,
      message: `Vocẽ tem ${payload.count} ${payload.count === 1 ? 'notificação' : 'notificações'} na Bet365.`,
    }),
  }

  const notificationFactory = notificationFactoriesByMessage[message]
  const notification = notificationFactory(payload)

  createNotification({ 
    title: notification.title, 
    message: notification.message, 
  })
}

chrome.runtime.onMessage.addListener(({ message, payload }) => {
  handleMessage({ message, payload })
})
