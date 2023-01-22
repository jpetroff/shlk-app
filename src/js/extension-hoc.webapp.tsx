import { redirect, createSearchParams } from 'react-router-dom'
import React, { useState, useRef, useEffect, useDeferredValue } from 'react'

export interface WithExtensionProps {

}

export function withExtension<P extends { extension: WithExtensionProps }>(Component: React.ComponentType<P>) {
	function ComponentWithExtensionProp(props: Omit<P, 'extension'>) {
    return <Component {...(props as P)} />
	}

	return ComponentWithExtensionProp;
}