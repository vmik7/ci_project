import { Configuration } from 'api'

export interface SettingsState {
    data: Configuration

    isLoading: boolean
    isLoaded: boolean
    loadError: string | null

    isChanged: boolean

    isSaving: boolean
    isSaved: boolean
    saveError: string | null
}
