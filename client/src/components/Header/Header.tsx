import { memo, useMemo } from 'react'

import { Link } from 'react-router-dom'

import { Button, ButtonProps } from 'components/Button/Button'
import { cn } from 'helpers/cn'
import { BaseComponentProps } from 'types'

import 'components/Header/Header.scss'

const block = cn('header')

export interface HeaderProps extends BaseComponentProps {
    title: string
    isFaded?: boolean
    buttons?: Array<ButtonProps>
}

export const Header = memo<HeaderProps>((props) => {
    const { title, isFaded, buttons = [], className } = props

    const buttonsMemo = useMemo(
        () =>
            buttons.map((buttonProps) => (
                <Button
                    {...buttonProps}
                    key={buttonProps.text}
                    className={block('control')}
                />
            )),
        [buttons]
    )

    return (
        <header className={block({ faded: isFaded }, [className])}>
            <div className={block('container', ['container'])}>
                <h1 className={block('title')}>
                    <Link to="/" className={block('link')}>
                        {title}
                    </Link>
                </h1>
                {buttonsMemo}
            </div>
        </header>
    )
})
