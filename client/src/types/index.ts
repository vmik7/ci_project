import { AppDispatch as Dispatch } from 'store/types'

export interface BaseComponentProps {
    className?: string
}
export interface BasePageProps {
    contentClass?: string
    loadData: (dispatch: Dispatch, params?: any) => void
}
