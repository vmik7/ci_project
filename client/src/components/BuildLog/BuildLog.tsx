import { memo } from 'react'

// import Ansi from 'ansi-to-react'

import { cn } from 'helpers/cn'
import { BaseComponentProps } from 'types'

import 'components/BuildLog/BuildLog.scss'
import 'components/BuildLog/ansi.scss'

export interface BuildLogProps extends BaseComponentProps {
    logs?: string
}
const block = cn('build-log')

export const BuildLog = memo<BuildLogProps>((props) => {
    const { logs, className } = props

    return (
        <pre className={block(null, [className])}>
            {/*<Ansi useClasses>{logs}</Ansi>*/}
            {logs}
        </pre>
    )
})
