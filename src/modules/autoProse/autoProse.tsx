'use client'

import { FC, useMemo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import styles from './autoProse.module.scss'
import { AutoProseProps } from './autoProse.types'

const isH2 = (line: string): boolean => /^\d+\.\s/.test(line.trim())
const isH3 = (line: string): boolean => /^\d+\.\d+\s/.test(line.trim()) || /^\d+\.\d+\.\s/.test(line.trim())

// Explicit heading markers (wrapper): [[h2]] Title, [[h3]] Subtitle
const isExplicitH2 = (line: string): boolean => /^\[\[h2\]\]/i.test(line.trim())
const isExplicitH3 = (line: string): boolean => /^\[\[h3\]\]/i.test(line.trim())
const stripExplicitHeading = (line: string): string => line.replace(/^\[\[(h2|h3)\]\]\s*/i, '')

// Also support simple markdown-style headings as a convenience
const isMdH2 = (line: string): boolean => /^##\s+/.test(line.trim())
const isMdH3 = (line: string): boolean => /^###\s+/.test(line.trim())
const stripMdHeading = (line: string): string => line.replace(/^#{2,3}\s+/, '')

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

		// Helpers for table parsing
		const isTableRow = (l: string): boolean => /\|/.test(l) && l.split('|').length >= 3
		const isMdSeparator = (l: string): boolean => /^\s*\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(l)

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]
			if (!line) continue

			// Table block: consecutive rows with pipes, optional markdown-style separator after header
			if (isTableRow(line)) {
				const block: string[] = []
				while (i < lines.length && isTableRow(lines[i])) {
					block.push(lines[i])
					i++
				}
				// step back one since for-loop will i++
				i--
				let headerCells: string[] | null = null
				const dataRows: string[][] = []
				if (block.length >= 2 && isMdSeparator(block[1])) {
					headerCells = block[0].replace(/^\||\|$/g, '').split('|').map(c => c.trim())
					for (let r = 2; r < block.length; r++) {
						const cells = block[r].replace(/^\||\|$/g, '').split('|').map(c => c.trim())
						dataRows.push(cells)
					}
				} else {
					for (let r = 0; r < block.length; r++) {
						const cells = block[r].replace(/^\||\|$/g, '').split('|').map(c => c.trim())
						dataRows.push(cells)
					}
				}

				elements.push(
					<div key={`table-${i}`} className={styles.tableWrap}>
						<table className={styles.table}>
							{headerCells && (
								<thead>
									<tr>
										{headerCells.map((cell, ci) => (
											<th key={`th-${i}-${ci}`}>{renderWithLinks(cell, `th-${i}-${ci}`)}</th>
										))}
									</tr>
								</thead>
							)}
							<tbody>
								{dataRows.map((row, ri) => (
									<tr key={`tr-${i}-${ri}`}>
										{row.map((cell, ci) => (
											<td key={`td-${i}-${ri}-${ci}`}>{renderWithLinks(cell, `td-${i}-${ri}-${ci}`)}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)
				continue
			}

			// Explicit and markdown-style headings
			if (isExplicitH2(line) || isMdH2(line) || isH2(line)) {
				const textContent = isExplicitH2(line) ? stripExplicitHeading(line) : isMdH2(line) ? stripMdHeading(line) : line
				elements.push(<h2 key={`h2-${i}`} className={styles.h2}>{renderWithLinks(textContent, `h2-${i}`)}</h2>)
				continue
			}
			if (isExplicitH3(line) || isMdH3(line) || isH3(line)) {
				const textContent = isExplicitH3(line) ? stripExplicitHeading(line) : isMdH3(line) ? stripMdHeading(line) : line
				elements.push(<h3 key={`h3-${i}`} className={styles.h3}>{renderWithLinks(textContent, `h3-${i}`)}</h3>)
				continue
			}

			// Paragraph fallback
			elements.push(<p key={`p-${i}`} className={styles.p}>{renderWithLinks(line, `p-${i}`)}</p>)
		}

		return elements
	}, [raw])

	const rootClassName = classNames(styles.root, className)

	return <div className={rootClassName}>{nodes}</div>
}

export default AutoProse
