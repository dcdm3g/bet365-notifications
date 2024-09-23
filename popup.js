function emitMessage({ message, payload }) {
  chrome.runtime.sendMessage({ message, payload })
}

async function openBetTabIfClosed() {
  const betTabs = await chrome.tabs.query({ url: 'https://*.bet365.com/*' })

  if (betTabs.length === 0) {
    await chrome.tabs.create({
      url: 'https://bet365.com/#/HO/',
    })
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await openBetTabIfClosed()
})
