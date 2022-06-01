import { memo, useCallback, useEffect, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { BuildItem } from 'components/BuildItem/BuildItem'
import { Button } from 'components/Button/Button'
import { Header } from 'components/Header/Header'
import { NewBuild } from 'components/NewBuild/NewBuild'
import { cn } from 'helpers/cn'
import { getBuilds, openModal, moreBuilds } from 'store/buildsSlice'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
} from 'store/hooks'
import { getRepoName } from 'store/settingsSlice'
import { BasePageProps } from 'types'

import 'pages/BuildList/BuildList.scss'
export interface BuildListProps extends BasePageProps {}

const block = cn('build-list')

export const BuildList = memo<BuildListProps>((props) => {
    const { contentClass, loadData } = props

    const dispatch = useDispatch()

    useEffect(() => {
        loadData(dispatch)
    }, [dispatch, loadData])

    const builds = useSelector(getBuilds())
    const repoName = useSelector(getRepoName())

    const navigate = useNavigate()

    const onRunBuildHandler = useCallback(() => {
        dispatch(openModal())
    }, [dispatch])

    const onSettingsHandler = useCallback(() => {
        navigate('/settings')
    }, [navigate])

    const onItemClickHandler = useCallback(
        (id: string) => {
            navigate(`/build/${id}`)
        },
        [navigate]
    )

    const showMoreHandler = useCallback(
        () => dispatch(moreBuilds()),
        [dispatch]
    )

    const buildsMemo = useMemo(
        () =>
            builds.data.map((build) => (
                <BuildItem
                    data={build}
                    key={build.buildNumber}
                    className={block('item')}
                    onClick={onItemClickHandler.bind(null, build.id)}
                />
            )),
        [builds.data, onItemClickHandler]
    )

    const showMoreMemo = useMemo(
        () =>
            builds.isLoading ? (
                <div>Loading...</div>
            ) : !builds.isAllLoaded ? (
                <Button text="Show more" onClick={showMoreHandler} />
            ) : null,
        [builds.isLoading, builds.isAllLoaded, showMoreHandler]
    )

    const modalMemo = useMemo(
        () => (builds.isModalOpen ? <NewBuild /> : null),
        [builds.isModalOpen]
    )

    return (
        <>
            <Header
                title={repoName}
                buttons={[
                    {
                        text: 'Run Build',
                        hasIcon: true,
                        /* prettier-ignore */
                        svg: <svg width="9" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.289 4.193L1.414.128C.855-.202 0 .118 0 .935v8.127a.937.937 0 001.414.806l6.875-4.062a.936.936 0 000-1.613z" fill="#111" /></svg>,
                        isSmall: true,
                        onClick: onRunBuildHandler,
                    },
                    {
                        text: 'Settings',
                        hasIcon: true,
                        iconOnly: true,
                        /* prettier-ignore */
                        svg: <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.34 7.442l-1.03-.595a4.662 4.662 0 000-1.699l1.03-.595a.292.292 0 00.134-.338 6.026 6.026 0 00-1.324-2.29.291.291 0 00-.358-.055l-1.03.595a4.566 4.566 0 00-1.471-.849V.428a.29.29 0 00-.228-.283 6.082 6.082 0 00-2.641 0 .29.29 0 00-.228.283v1.19a4.71 4.71 0 00-1.47.85l-1.03-.595a.287.287 0 00-.357.055A5.99 5.99 0 00.013 4.217a.29.29 0 00.134.339l1.03.595a4.66 4.66 0 000 1.698l-1.03.595a.292.292 0 00-.134.34c.269.86.726 1.64 1.324 2.288.092.099.242.123.358.055l1.03-.595c.434.373.932.66 1.472.85v1.19a.29.29 0 00.227.283 6.082 6.082 0 002.642 0 .29.29 0 00.227-.283v-1.19a4.71 4.71 0 001.471-.85l1.03.595a.287.287 0 00.359-.055 5.989 5.989 0 001.323-2.289.299.299 0 00-.135-.341zm-5.598.491a1.938 1.938 0 01-1.935-1.935c0-1.067.869-1.936 1.935-1.936 1.067 0 1.936.869 1.936 1.936a1.938 1.938 0 01-1.936 1.935z" fill="#111"/></svg>,
                        isSmall: true,
                        onClick: onSettingsHandler,
                    },
                ]}
            />
            <div
                className={block(null, [contentClass])}
                data-testid="build-list"
            >
                <div className={block('container', ['container'])}>
                    {buildsMemo}
                    {showMoreMemo}
                </div>
                {modalMemo}
            </div>
        </>
    )
})