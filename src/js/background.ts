import config from './config'
import browserApi, { ExtensionAlarm, ExtensionMessageSender } from './browser.api'

function indexAlarms(alarms: ExtensionAlarm[]) : { [name: string]: ExtensionAlarm } {
  let result : { [name: string]: ExtensionAlarm } = {}
  alarms.forEach( (alarm) => {
    result[alarm.name] = alarm
  })
  return result
}

async function getShortlinks(skip: number) : Promise<AnyObject[]> {
  const response = await fetch(config.serviceUrl+'/api', {
    method: 'POST',
    body: JSON.stringify({
      query: `
      {
        getUserShortlinks(args: {isSnooze: true, sort: "snooze.awake", order: "1", limit: 30, skip:${skip}}) {
          location snooze {awake} 
        } 
      }`
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  if(response.status != 200) return []

  const responseBody = await response.json()
  return responseBody.data?.getUserShortlinks || []
}

async function resetAlarms(links: AnyObject[]) {
  const alarms = await browserApi.getAlarms()
  let indexedAlarms = indexAlarms(alarms)
  links.forEach( (shortlink) => {
    const time = /test\-snooze/ig.test(shortlink.location) ? Date.now() + 1000 : shortlink.snooze.awake
    browserApi.setAlarm(shortlink.location, {
      when: time
    })
    if(indexAlarms[shortlink.location]) indexAlarms[shortlink.location] = undefined
  })
  const checkAlarms = Object.getOwnPropertyNames(indexedAlarms)
  checkAlarms.forEach( (alarmName) => {
    if(alarmName != 'syncSnoozedTabs' && indexAlarms[alarmName] != undefined) 
      browserApi.removeAlarm(alarmName)
  })
}

async function syncSnoozedTabs() {
  let snoozedLinks = []
  let next : boolean = true

  const threshold = new Date()
  threshold.setDate(threshold.getDate() + 7)

  while(next) {
    const chunk = await getShortlinks(snoozedLinks.length)
    snoozedLinks = Array().concat(snoozedLinks, chunk)
  
    if(chunk.length < 30 || chunk[chunk.length - 1].awake >= threshold.valueOf())
      next = false
  }
  resetAlarms(snoozedLinks)
}

function awakeTab(url: string) {
  browserApi.openExternal(url)
  browserApi.createNotification({
    type: 'basic',
    title: 'Woke up snoozed tab',
    message: url,
    iconUrl: '/assets/favicon/android-chrome-192x192.png',
    priority: 2
  }, url, (result: any) => {
    console.log('Notification: '+result)
  })
}

async function registerPeriodicSync() {
  await syncSnoozedTabs()
  browserApi.setAlarm('syncSnoozedTabs', {
    periodInMinutes: 60 * 12
  })
}

async function notificationClickHandle(url: string) {
  const tabs = await browserApi.findTab(url)
  if(!tabs[0]) return
  chrome.tabs.update(tabs[0].id, { active: true })
}

function messageHandler(message: any, sender: ExtensionMessageSender, sendResponse?: () => void) : boolean {
  if(message.command == 'sync') syncSnoozedTabs()
  return true
}

browserApi.onInstalled( async () => {
  try {
    console.log('installed')
    await registerPeriodicSync()
  } catch (err) {
    console.error(err)
  }
})

browserApi.onStartup( async () => {
  await syncSnoozedTabs()
})

browserApi.onAlarm( (alarm) => {
  if(alarm.name == 'syncSnoozedTabs') {
    syncSnoozedTabs()
  } else {
    awakeTab(alarm.name)
  }
})

browserApi.onNotificationClick(notificationClickHandle)
browserApi.onMessage(messageHandler)