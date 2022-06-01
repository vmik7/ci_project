import { memo, useMemo } from 'react'

import { cn } from 'helpers/cn'
import { BaseComponentProps } from 'types'

import 'components/Button/Button.scss'

const block = cn('button')

export interface ButtonProps
    extends BaseComponentProps,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    hasIcon?: boolean
    iconOnly?: boolean
    svg?: React.ReactElement
    isPrimary?: boolean
    isSmall?: boolean
    isDisabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = memo<ButtonProps>((props) => {
    const {
        text,
        svg,
        hasIcon,
        iconOnly,
        isPrimary,
        isSmall,
        className,
        onClick,
        ...buttonProps
    } = props

    const iconMemo = useMemo(
        () => (hasIcon ? <span className={block('icon')}>{svg}</span> : null),
        [hasIcon, svg]
    )
    const textMemo = useMemo(
        () =>
            !iconOnly ? <span className={block('text')}>{text}</span> : null,
        [iconOnly, text]
    )

    return (
        <button
            className={block(
                {
                    primary: isPrimary,
                    small: isSmall,
                    'has-icon': hasIcon,
                    'icon-only': iconOnly,
                },
                [className]
            )}
            onClick={onClick}
            {...buttonProps}
        >
            {iconMemo}
            {textMemo}
        </button>
    )
})
