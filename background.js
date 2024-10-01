function createNotification({ title, message }) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'assets/icon-128x128.png',
    title,
    message,
  })
}

function handleMessage({ action, payload }) {
  const notificationFactories = {
    'user-has-logged-out': () => ({
      title: 'Faça login na Bet365',
      message: 'Parece que você não está autenticado na Bet365, faça login para receber notificações.',
    }),
    'notifications-increased': ({ notifications }) => ({
      title: `${notifications} ${notifications === 1 ? 'notificação' : 'notificações'} na Bet365`,
      message: `Vocẽ tem ${notifications} ${notifications === 1 ? 'notificação' : 'notificações'} na Bet365.`,
    }),
  }

  const notificationFactory = notificationFactories[action]
  const notification = notificationFactory(payload)

  createNotification({ 
    title: notification.title, 
    message: notification.message, 
  })

  const sound = new Audio('assets/notification-sound.mp3')
  sound.play()
}

chrome.runtime.onMessage.addListener(({ action, payload }) => {
  console.log(JSON.stringify(payload, null, 2))
  handleMessage({ action, payload })
})
