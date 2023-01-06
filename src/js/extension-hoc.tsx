import _ from 'underscore'
import { redirect, createSearchParams } from 'react-router-dom'
import React, { useState, useRef, useEffect, useDeferredValue } from 'react'
import browserApi, { TabObject } from './browser-api'

browserApi.onMessage(
	(message, sender, sendResponse) => {
		return true
	}
 )

export interface WithExtensionProps {
	activeTabUrl: string
}

export function withExtension<P extends { extension: WithExtensionProps }>(Component: React.ComponentType<P>) {
	function ComponentWithExtensionProp(props: Omit<P, 'extension'>) {
			const [activeTabUrl, setActiveTabUrl] = useState('')

			useEffect( () => {
				function deferredStateUpdate(result) {
					console.log(result, activeTabUrl)
					setActiveTabUrl(result.url)
				}

				browserApi.getTab(true).then( deferredStateUpdate )
			})			

			return <Component {...(props as P)} extension={ { activeTabUrl: activeTabUrl } } />
	}

	return ComponentWithExtensionProp;
}