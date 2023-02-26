import config from './config'
import browserApi, { ExtensionAlarm } from './browser.api'

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
    browserApi.setAlarm(shortlink.location, {
      when: shortlink.snooze.awake
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
}

async function registerPeriodicSync() {
  await syncSnoozedTabs()
  browserApi.setAlarm('syncSnoozedTabs', {
    periodInMinutes: 60 * 12
  })
}

browserApi.onInstalled( async () => {
  try {
    console.log('installed')
    await registerPeriodicSync()
    browserApi.onAlarm( (alarm) => {
      if(alarm.name == 'syncSnoozedTabs') {
        syncSnoozedTabs()
      } else {
        awakeTab(alarm.name)
      }
    })
  } catch (err) {
    console.error(err)
  }
})