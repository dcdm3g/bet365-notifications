function getIsLoggedIn() {
  const narrowLoginButton = 
    document.querySelector('.hm-MainHeaderRHSLoggedOutNarrow_Login')

  const wideLoginButton = 
    document.querySelector('.hm-MainHeaderRHSLoggedOutWide_Login ')

  return !narrowLoginButton && !wideLoginButton
}

function getNotifications() {
  const notificationsElement = 
    document.querySelector('.hm-HeaderMenuItemMyBets_MyBetsCount')

  return notificationsElement
    ? Number(notificationsElement.innerText)
    : 0
}

function handleGetStateMessage() {
  const isLoggedIn = getIsLoggedIn()
  const notifications = getNotifications()

  chrome.runtime.sendMessage({ 
    message: 'set-state', 
    payload: { isLoggedIn, notifications }
  })
}

chrome.runtime.onMessage.addListener(({ message }) => {
  if (message === 'get-state') {
    handleGetStateMessage()
  }
})