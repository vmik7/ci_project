import { useMemo, memo } from 'react'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Build } from 'api'
import iconFail from 'components/BuildItem/icons/fail.svg'
import iconPending from 'components/BuildItem/icons/pending.svg'
import iconSuccess from 'components/BuildItem/icons/success.svg'
import { cn } from 'helpers/cn'
import { getDurationString } from 'helpers/getDurationString'
import { BaseComponentProps } from 'types'

import 'components/BuildItem/BuildItem.scss'

const block = cn('build-item')

export interface IBuildItemProps extends BaseComponentProps {
    data: Build
    className?: string
    isDetailed?: boolean
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export const BuildItem = memo<IBuildItemProps>((props) => {
    const { data, className, isDetailed, onClick } = props
    const {
        buildNumber,
        commitMessage,
        commitHash,
        branchName,
        authorName,
        status,
        start,
        duration,
    } = data

    const startMemo = useMemo(
        () =>
            start ? (
                <div className={block('time')}>
                    {format(new Date(start), 'd MMMM, HH:mm', { locale: ru })}
                </div>
            ) : null,
        [start]
    )

    const durationMemo = useMemo(
        () =>
            duration ? (
                <div className={block('duration')}>
                    {getDurationString(duration)}
                </div>
            ) : null,
        [duration]
    )

    let statusMod, icon
    switch (status) {
        case 'Success':
            statusMod = 'success'
            icon = iconSuccess
            break
        case 'Waiting':
        case 'InProgress':
            statusMod = 'pending'
            icon = iconPending
            break
        case 'Fail':
        case 'Canceled':
            statusMod = 'fail'
            icon = iconFail
            break
        default:
            break
    }

    return (
        <article
            className={block(
                {
                    status: statusMod,
                    deatiled: isDetailed,
                    clickable: Boolean(onClick),
                },
                [className]
            )}
            onClick={onClick}
        >
            <div className={block('icon')}>
                <img src={icon} alt="status" />
            </div>
            <div className={block('main')}>
                <header className={block('header')}>
                    <div className={block('number')}>{buildNumber}</div>
                    <div className={block('message')}>{commitMessage}</div>
                </header>
                <div className={block('details')}>
                    <div className={block('commit')}>
                        <div className={block('branch')}>{branchName}</div>
                        <div className={block('hash')}>
                            {commitHash.slice(0, 7)}
                        </div>
                    </div>
                    <div className={block('author')}>{authorName}</div>
                </div>
            </div>
            <footer className={block('footer')}>
                {startMemo}
                {durationMemo}
            </footer>
        </article>
    )
})
