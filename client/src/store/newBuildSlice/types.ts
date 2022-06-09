import { BuildRequestResult } from 'api'

export interface NewBuildState {
    hash: string

    isSubmitting: boolean
    isSubmitted: boolean
    submitError: string | null

    data: BuildRequestResult | null
}
