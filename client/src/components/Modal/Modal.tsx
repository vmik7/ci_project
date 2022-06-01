import React, { memo, useCallback, useMemo, useRef } from 'react'

import { cn } from 'helpers/cn'
import { BaseComponentProps } from 'types'

import 'components/Modal/Modal.scss'

const block = cn('modal')

export interface ModalProps extends BaseComponentProps {
    title?: string
    subtitle?: string
    content?: React.ReactNode
    onWrapperClick?: (
        event?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void
}

export const Modal = memo<ModalProps>((props) => {
    const { title, subtitle, content, className, onWrapperClick } = props

    const wrapperEl = useRef(null)

    const wrapperClicHandler = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (event.target === wrapperEl.current && onWrapperClick) {
                onWrapperClick(event)
            }
        },
        [wrapperEl, onWrapperClick]
    )

    const titleMemo = useMemo(
        () => (title ? <p className={block('title')}>{title}</p> : null),
        [title]
    )
    const subtitleMemo = useMemo(
        () =>
            subtitle ? <p className={block('subtitle')}>{subtitle} </p> : null,
        [subtitle]
    )

    return (
        <div className={block(null, [className])}>
            <div
                ref={wrapperEl}
                className={block('wrapper')}
                onClick={wrapperClicHandler}
            >
                <div className={block('window')}>
                    {titleMemo}
                    {subtitleMemo}
                    {content}
                </div>
            </div>
        </div>
    )
})
