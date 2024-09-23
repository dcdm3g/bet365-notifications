async function openBetTabIfClosed() {
  chrome.tabs.query({ url: 'https://*.bet365.com/*' }, async (betTabs) => {
    if (betTabs.length === 0) {
      await chrome.tabs.create({
        url: 'https://bet365.com/#/HO/',
      })
    }
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  await openBetTabIfClosed()
})
