import { memo } from 'react'

import { cn } from 'helpers/cn'
import { BaseComponentProps } from 'types'

import 'components/Footer/Footer.scss'

const block = cn('footer')

export interface FooterProps extends BaseComponentProps {}

export const Footer = memo<FooterProps>((props) => {
    const { className } = props

    return (
        <footer className={block(null, [className])}>
            <div className={block('container', ['container'])}>
                <ul className={block('list')}>
                    <li className={block('item')}>
                        <a href="*" className={block('link')}>
                            Support
                        </a>
                    </li>
                    <li className={block('item')}>
                        <a href="*" className={block('link')}>
                            Learning
                        </a>
                    </li>
                    <li className={block('item')}>
                        <a href="*" className={block('link')}>
                            Русская версия
                        </a>
                    </li>
                </ul>
                <p className={block('copyright')}>© 2020 Your Name</p>
            </div>
        </footer>
    )
})
