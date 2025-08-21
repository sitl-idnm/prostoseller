'use client'

import { FC, useMemo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import styles from './autoProse.module.scss'
import { AutoProseProps } from './autoProse.types'

const isH2 = (line: string): boolean => /^\d+\.\s/.test(line.trim())
const isH3 = (line: string): boolean => /^\d+\.\d+\s/.test(line.trim()) || /^\d+\.\d+\.\s/.test(line.trim())

const LINK_REGEX = /(https?:\/\/[^\s<>'")]+|\/[A-Za-z0-9\-._~/#?\]@!$&'()*+,;=%]+)/g
const trimTrailingPunctuation = (token: string): { core: string; trailing: string } => {
	const m = token.match(/[)\],.;:!?]+$/)
	if (!m) return { core: token, trailing: '' }
	return { core: token.slice(0, -m[0].length), trailing: m[0] }
}

const renderWithLinks = (line: string, keyPrefix: string) => {
	const result: (JSX.Element | string)[] = []
	let lastIndex = 0
	let match: RegExpExecArray | null
	while ((match = LINK_REGEX.exec(line)) !== null) {
		const matchText = match[0]
		const start = match.index
		if (start > lastIndex) {
			result.push(line.slice(lastIndex, start))
		}
		const { core, trailing } = trimTrailingPunctuation(matchText)
		result.push(
			<Link key={`${keyPrefix}-link-${result.length}`} href={core}>
				{core}
			</Link>
		)
		if (trailing) result.push(trailing)
		lastIndex = start + matchText.length
	}
	if (lastIndex < line.length) {
		result.push(line.slice(lastIndex))
	}
	return result
}

const AutoProse: FC<AutoProseProps> = ({ className, text, children }) => {
	const raw = useMemo(() => {
		if (typeof text === 'string') return text
		if (typeof children === 'string') return children
		return ''
	}, [text, children])

	const nodes = useMemo(() => {
		if (!raw) return null
		const lines = raw.replace(/\r\n/g, '\n').split('\n').map(l => l.trim())
		const elements: JSX.Element[] = []
		lines.forEach((line, idx) => {
			if (!line) return
			if (isH2(line)) {
				elements.push(<h2 key={`h2-${idx}`} className={styles.h2}>{renderWithLinks(line, `h2-${idx}`)}</h2>)
			} else if (isH3(line)) {
				elements.push(<h3 key={`h3-${idx}`} className={styles.h3}>{renderWithLinks(line, `h3-${idx}`)}</h3>)
			} else {
				elements.push(<p key={`p-${idx}`} className={styles.p}>{renderWithLinks(line, `p-${idx}`)}</p>)
			}
		})
		return elements
	}, [raw])

	const rootClassName = classNames(styles.root, className)

	return <div className={rootClassName}>{nodes}</div>
}

export default AutoProse
