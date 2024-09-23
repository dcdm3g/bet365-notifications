function emitMessage({ message, payload }) {
  chrome.runtime.sendMessage({ message, payload })
}

function getIsAuthenticated() {
  const narrowLoginButton = document.querySelector('.hm-MainHeaderRHSLoggedOutNarrow_Login')
  const wideLoginButton = document.querySelector('.hm-MainHeaderRHSLoggedOutWide_Login ')

  return !narrowLoginButton && !wideLoginButton
}

function getNotificationCount() {
  const notificationCountElement = 
    document.querySelector('.hm-HeaderMenuItemMyBets_MyBetsCount')

  return notificationCountElement
    ? Number(notificationCountElement.innerText)
    : 0
}

let state = {
  isAuthenticated: null,
  notificationCount: null,
}

function refreshNotifications() {
  const isAuthenticated = getIsAuthenticated()

  if (!isAuthenticated) {
    if (isAuthenticated !== state.isAuthenticated) {
      state.isAuthenticated = isAuthenticated

      emitMessage({ 
        message: 'user-not-authenticated',
      })
    }
    
    return
  }

  const notificationCount = getNotificationCount()

  if (notificationCount && notificationCount > state.notificationCount) {
    state.notificationCount = notificationCount

    emitMessage({
      message: 'notification-count-increased',
      payload: { count: notificationCount },
    })
  }
}

window.onload = () => setInterval(refreshNotifications, 1000)
