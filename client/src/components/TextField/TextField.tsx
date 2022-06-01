import React, { memo, useCallback, useMemo } from 'react'

import { cn } from 'helpers/cn'
import { BaseComponentProps } from 'types'

import 'components/TextField/TextField.scss'

const block = cn('text-field')

export interface TextFieldProps
    extends BaseComponentProps,
        React.InputHTMLAttributes<HTMLInputElement> {
    isLabeled?: boolean
    labelText?: string
    isInline?: boolean
    onChangeHandler(value: string): void
}

export const TextField = memo<TextFieldProps>((props) => {
    const {
        isLabeled,
        labelText,
        isInline,
        className,
        onChangeHandler,
        ...inputAttributes
    } = props

    const WrapperTag = isInline ? 'span' : 'div'

    const onChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeHandler(e.target.value),
        [onChangeHandler]
    )
    const onClearHandler = useCallback(
        () => onChangeHandler(''),
        [onChangeHandler]
    )

    const clearButtonMemo = useMemo(
        () =>
            !isInline && inputAttributes.value ? (
                <button className={block('clear')} onClick={onClearHandler}>
                    {/* prettier-ignore */}
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm4-10.88L10.88 4 8 6.88 5.12 4 4 5.12 6.88 8 4 10.88 5.12 12 8 9.12 10.88 12 12 10.88 9.12 8 12 5.12z" fill="#CCC" /></svg>
                </button>
            ) : null,
        [isInline, inputAttributes.value, onClearHandler]
    )

    const input = useMemo(
        () => (
            <>
                <input
                    className={block('input')}
                    {...inputAttributes}
                    onChange={onChangeCallback}
                />
                {clearButtonMemo}
            </>
        ),
        [clearButtonMemo, inputAttributes, onChangeCallback]
    )

    const inputLabeled = useMemo(
        () => (
            <label className={block('label-wrap')}>
                <span className={block('label')}>{labelText}</span>
                {input}
            </label>
        ),
        [input, labelText]
    )

    const inputMemo = useMemo(
        () => (isLabeled ? inputLabeled : input),
        [isLabeled, inputLabeled, input]
    )

    return (
        <WrapperTag
            className={block(
                {
                    inline: isInline,
                    required: inputAttributes.required,
                },
                [className]
            )}
        >
            {inputMemo}
        </WrapperTag>
    )
})
