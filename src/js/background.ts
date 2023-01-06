import _ from 'underscore'
import browserApi from './browser-api';
// console.log(chrome.commands.getAll())

global.sendActiveTabUrl = async function sendActiveTabUrl() {
	const activeTab = await browserApi.getTab(true)
	const response = await browserApi.sendMessage({activeUrl: activeTab.url})
	return response
}