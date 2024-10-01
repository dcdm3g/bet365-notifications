function emitMessage({ action, payload }) {
  chrome.runtime.sendMessage({ action, payload })
}

function getIsLoggedIn() {
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
  isLoggedIn: null,
  notifications: null,
}

function refreshNotifications() {
  const isLoggedIn = getIsAuthenticated()

  if (!isLoggedIn) {
    if (isLoggedIn !== state.isLoggedIn) {
      state.isLoggedIn = isLoggedIn

      emitMessage({ 
        action: 'user-has-logged-out',
      })
    }
    
    return
  }

  const notifications = getNotifications()

  if (notifications && notifications > state.notifications) {
    emitMessage({
      action: 'notifications-increased',
      payload: { notifications },
    })
  }

  state.notifications = notifications
}

window.onload = () => setInterval(refreshNotifications, 1000)
