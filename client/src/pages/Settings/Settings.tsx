import { memo, useEffect, useCallback, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { Button } from 'components/Button/Button'
import { Header } from 'components/Header/Header'
import { TextField } from 'components/TextField/TextField'
import { cn } from 'helpers/cn'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
} from 'store/hooks'
import {
    getSettingsData,
    getSavingStatus,
    setSettings,
    fieldsChanged,
    nullSaveError,
    nullSaveStatus,
} from 'store/settingsSlice'
import { BasePageProps } from 'types'

import 'pages/Settings/Settings.scss'
export interface SettingsProps extends BasePageProps {}

const block = cn('settings')

function validate(repoName: string, buildCommand: string) {
    if (!repoName) {
        return 'Имя репозитория - обязательное поле!'
    }
    if (!buildCommand) {
        return 'Команда для сборки - обязательное поле!'
    }
    if (!/^[^/]+\/[a-zA-Z0-9_-]+$/.test(repoName)) {
        return 'Ошибка! Github репозиторий должен быть задан в виде:\n\nимя-пользователя/название-репозитория'
    }
    return ''
}

export const Settings = memo<SettingsProps>((props) => {
    const { contentClass, loadData } = props

    const dispatch = useDispatch()

    useEffect(() => {
        loadData(dispatch)
    }, [dispatch, loadData])

    const data = useSelector(getSettingsData())

    const [repoName, setRepoName] = useState(data.repoName)
    const [buildCommand, setBuildCommand] = useState(data.buildCommand)
    const [mainBranch, setMainBranch] = useState(data.mainBranch)
    const [period, setPeriod] = useState(data.period)

    const { isSaving, saveError, isSaved, isChanged } = useSelector(
        getSavingStatus()
    )

    const navigate = useNavigate()

    useEffect(() => {
        setRepoName(data.repoName)
        setBuildCommand(data.buildCommand)
        setMainBranch(data.mainBranch)
        setPeriod(data.period)
    }, [data, setRepoName, setBuildCommand, setMainBranch, setPeriod])

    useEffect(() => {
        dispatch(
            fieldsChanged({
                repoName,
                buildCommand,
                mainBranch,
                period,
            })
        )
    }, [dispatch, repoName, buildCommand, mainBranch, period])

    useEffect(() => {
        if (saveError) {
            toast.error(`Доступ к репозиторию ${repoName} невозможен!`)
            dispatch(nullSaveError())
        }
    }, [saveError, repoName, dispatch])

    useEffect(() => {
        if (isSaving) {
            const toastId = toast.loading(`Waiting...`)
            return () => {
                toast.dismiss(toastId)
            }
        }
    }, [isSaving])

    useEffect(() => {
        if (isSaved) {
            toast.success(`Настройки сохранены`)
            dispatch(nullSaveStatus())
        }
    }, [isSaved, dispatch])

    const onPeriodChange = useCallback(
        (value: string) => {
            value = value.trim()
            if (/^[0-9]*$/.test(value)) {
                setPeriod(+value)
            }
        },
        [setPeriod]
    )

    const onSaveHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            const errorMessage = validate(repoName, buildCommand)
            if (errorMessage) {
                toast.error(errorMessage)
            } else {
                dispatch(
                    setSettings({
                        repoName,
                        buildCommand,
                        mainBranch,
                        period,
                    })
                )
            }
        },
        [dispatch, repoName, buildCommand, mainBranch, period]
    )
    const onCancelHandler = useCallback(() => {
        navigate('/')
    }, [navigate])

    return (
        <>
            <Header title="School CI server" isFaded={true} />
            <div className={block(null, [contentClass])} data-testid="settings">
                <div className={block('container', ['container'])}>
                    <div className={block('header')}>
                        <h2 className={block('title')}>Settings</h2>
                        <p className={block('sub-title')}>
                            Configure repository connection and synchronization
                            settings.
                        </p>
                    </div>
                    <form>
                        <TextField
                            value={repoName}
                            placeholder="user-name/repo-name"
                            isLabeled
                            labelText="GitHub repository"
                            required
                            className={block('input')}
                            name="repo"
                            onChangeHandler={setRepoName}
                        />
                        <TextField
                            value={buildCommand}
                            placeholder="example: npm run build"
                            isLabeled
                            labelText="Build command"
                            required
                            className={block('input')}
                            name="build"
                            onChangeHandler={setBuildCommand}
                        />
                        <TextField
                            value={mainBranch}
                            placeholder="main"
                            isLabeled
                            labelText="Main branch"
                            className={block('input')}
                            name="branch"
                            onChangeHandler={setMainBranch}
                        />
                        <div className={block('input', { inline: true })}>
                            Synchronize every
                            <TextField
                                value={period}
                                placeholder="10"
                                isInline={true}
                                name="period"
                                onChangeHandler={onPeriodChange}
                            />
                            minutes
                        </div>
                        <div className={block('controls')}>
                            <Button
                                text="Save"
                                isPrimary={true}
                                className={block('button', {
                                    action: 'save',
                                })}
                                onClick={onSaveHandler}
                                disabled={isSaving || !isChanged}
                            />
                            <Button
                                text="Cancel"
                                className={block('button', {
                                    action: 'cancel',
                                })}
                                onClick={onCancelHandler}
                                disabled={isSaving}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </>
    )
})
