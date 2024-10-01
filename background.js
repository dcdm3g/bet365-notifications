function emitNotification({ title, message }) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'assets/icon-128x128.png',
    title,
    message,
  })

  const sound = new Audio('assets/notification-sound.mp3')
  sound.play()
}
  
let state = {
  isLoggedIn: null,
  notifications: null,
}

function emitGetStateMessage() {
  chrome.tabs.query({ url: 'https://*.bet365.com/*' }, ([tab]) => {
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { message: 'get-state' }) 
    }
  })
}

function ns(notifications) {
  const label = notifications === 1 ? 'notificação' : 'notificações'
  return notifications + ' ' + label
}

function handleSetStateMessage({ isLoggedIn, notifications }) {
  if (!isLoggedIn) {
    if (state.isLoggedIn !== false) {
      emitNotification({ 
        title: 'Faça login na Bet365',
        message: 'Vocẽ precisa estar logado na Bet365 para receber notificações.',
      })
    }

    return (state.isLoggedIn = isLoggedIn)
  }

  state.isLoggedIn = isLoggedIn
  
  if (notifications > state.notifications) {
    emitNotification({
      title: ns(notifications) + ' na Bet365',
      message: 'Vocẽ tem ' + ns(notifications) + ' na Bet365.',
    })
  }

  state.notifications = notifications
}

chrome.runtime.onMessage.addListener(({ message, payload }) => {
  if (message === 'set-state') {
    handleSetStateMessage({
      isLoggedIn: payload.isLoggedIn,
      notifications: payload.notifications,
    })
  }
})

setInterval(emitGetStateMessage, 1000)
