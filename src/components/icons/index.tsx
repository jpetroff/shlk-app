import styles from './styles-icons.less'
import * as React from 'react'

import LogoSvg from '../../assets/svg/logo.svg'
import LogoCSvg from '../../assets/svg/logo-compact.svg'
import AvatarSvg from '../../assets/svg/icon/avatar.svg'
import CaretRightSvg from '../../assets/svg/icon/caret-right.svg'
import CaretLeftSvg from '../../assets/svg/icon/caret-left.svg'
import CrossSvg from '../../assets/svg/icon/cross.svg'
import CrossSvg_16 from '../../assets/svg/icon/cross_16.svg'
import EnterSvg from '../../assets/svg/icon/enter.svg'
import GoogleSvg from '../../assets/svg/icon/google.svg'
import SearchSvg from '../../assets/svg/icon/search.svg'
import SnoozeSvg from '../../assets/svg/icon/snooze.svg'
import LogoutSvg from '../../assets/svg/icon/logout.svg'
import CaretDownSvg from '../../assets/svg/icon/caret-down.svg'
import LinkSvg from '../../assets/svg/icon/link.svg'


export const Logo = LogoSvg
export const LogoC = LogoCSvg
export const Avatar = AvatarSvg
export const CaretRight = CaretRightSvg
export const CaretLeft = CaretLeftSvg
export const CaretDown = CaretDownSvg 
export const Cross = CrossSvg
export const Enter = EnterSvg
export const Google = GoogleSvg
export const Snooze = SnoozeSvg
export const Search = SearchSvg 
export const Logout = LogoutSvg 
export const LinkIcon = LinkSvg 

export const Cross_16 = CrossSvg_16

export enum IconSize {
	SMALL = 'small',
	LARGE = 'large'
}

export type ReactIcon = React.FunctionComponent<React.SVGAttributes<SVGElement>>

type Props = {
	useIcon: ReactIcon
	size: IconSize
} & JSX.IntrinsicElements["div"]

const Icon : React.FC<Props> = function( {
	useIcon,
	size,
  className
} ) {
	const globalClass = 'icon-svg'
	const IconNode = useIcon
  const propClass = className || ''
	return (
		<div className={`${styles.wrapperClass} ${globalClass} ${globalClass}_size-${size} ${propClass}`}>
			<IconNode className={`${globalClass}__node`} />
		</div>
	)
}

export default Icon