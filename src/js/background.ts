import _ from 'underscore'
import browserApi from './browser-api';

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);
	await browserApi.openPopup()
	const activeUrl = await browserApi.getTab(true)
	const response = await browserApi.sendMessage({activeUrl})
	return response
});