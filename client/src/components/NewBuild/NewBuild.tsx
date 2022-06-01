import { memo, useCallback, useEffect } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { Button } from 'components/Button/Button'
import { Modal } from 'components/Modal/Modal'
import { TextField } from 'components/TextField/TextField'
import { cn } from 'helpers/cn'
import { closeModal } from 'store/buildsSlice'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
} from 'store/hooks'
import {
    getSubmittingStatus,
    setHash,
    getHash,
    postBuild,
    getNewBuildData,
    nullSubmitError,
    nullNewBuildData,
} from 'store/newBuildSlice'
import { BaseComponentProps } from 'types'

import 'components/NewBuild/NewBuild.scss'

export interface NewBuildProps extends BaseComponentProps {}

const block = cn('new-build')

function validate(hash: string) {
    if (!/^[a-z0-9]+$/.test(hash)) {
        return 'Пожалуйста, введите корректный хеш коммита!'
    }
    return ''
}

export const NewBuild = memo<NewBuildProps>((props) => {
    const { className } = props

    const dispatch = useDispatch()

    const hash = useSelector(getHash())
    const { isSubmitting, submitError, isSubmitted } = useSelector(
        getSubmittingStatus()
    )
    const newBuildData = useSelector(getNewBuildData())

    let navigate = useNavigate()

    useEffect(() => {
        if (isSubmitting) {
            const loadingTostId = toast.loading('Waiting...')
            return () => {
                toast.dismiss(loadingTostId)
            }
        }
    }, [isSubmitting])

    useEffect(() => {
        if (submitError) {
            toast.error(submitError)
            return () => {
                dispatch(nullSubmitError())
            }
        }
    }, [submitError, dispatch])

    useEffect(() => {
        if (newBuildData && isSubmitted) {
            navigate(`/build/${newBuildData.id}`)
            return () => {
                dispatch(closeModal())
                dispatch(nullNewBuildData())
            }
        }
    }, [navigate, newBuildData, dispatch, isSubmitted])

    const onCancelHandler = useCallback(() => {
        dispatch(closeModal())
        dispatch(nullNewBuildData())
    }, [dispatch])

    const onSubmitHandler = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const errorMessage = validate(hash)
            if (errorMessage) {
                toast.error(errorMessage)
            } else {
                dispatch(postBuild())
            }
        },
        [hash, dispatch]
    )

    const onChangeHandler = useCallback(
        (value: string) => dispatch(setHash(value)),
        [dispatch]
    )

    return (
        <>
            <Modal
                className={block(null, [className])}
                title="New build"
                subtitle="Enter the commit hash which you want to build."
                onWrapperClick={onCancelHandler}
                content={
                    <form onSubmit={onSubmitHandler}>
                        <TextField
                            placeholder="Commit hash"
                            required
                            className={block('input')}
                            name="hash"
                            onChangeHandler={onChangeHandler}
                            value={hash}
                        />
                        <div className={block('controls')}>
                            <Button
                                isPrimary={true}
                                text="Run build"
                                type="submit"
                                disabled={isSubmitting}
                            />
                            <Button
                                text="Cancel"
                                onClick={onCancelHandler}
                                disabled={isSubmitting}
                            />
                        </div>
                    </form>
                }
            />
            <Toaster />
        </>
    )
})
