function emitMessage({ action, payload }) {
  chrome.runtime.sendMessage({ action, payload })
}

function getIsAuthenticated() {
  const narrowLoginButton = document.querySelector('.hm-MainHeaderRHSLoggedOutNarrow_Login')
  const wideLoginButton = document.querySelector('.hm-MainHeaderRHSLoggedOutWide_Login ')

  return !narrowLoginButton && !wideLoginButton
}

function getNotifications() {
  const notificationsElement = 
    document.querySelector('.hm-HeaderMenuItemMyBets_MyBetsCount')

  return notificationsElement
    ? Number(notificationsElement.innerText)
    : 0
}

let state = {
  isAuthenticated: null,
  notifications: null,
}

function refreshNotifications() {
  const isAuthenticated = getIsAuthenticated()

  if (!isAuthenticated) {
    if (isAuthenticated !== state.isAuthenticated) {
      state.isAuthenticated = isAuthenticated

      emitMessage({ 
        action: 'user-not-authenticated',
      })
    }
    
    return
  }

  const notifications = getNotifications()

  if (notifications && notifications > state.notifications) {
    state.notifications = notifications

    emitMessage({
      action: 'notification-count-increased',
      payload: { notifications },
    })
  }
}

window.onload = () => setInterval(refreshNotifications, 1000)
