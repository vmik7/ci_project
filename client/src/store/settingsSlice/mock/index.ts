import { SettingsState } from 'store/settingsSlice/types'

export const initialState: SettingsState = {
    data: {
        id: '1234',
        repoName: 'vmik7/primer',
        buildCommand: 'yarn build',
        mainBranch: 'master',
        period: 10,
    },

    isLoading: false,
    isLoaded: false,
    loadError: null,

    isChanged: false,

    isSaving: false,
    isSaved: false,
    saveError: null,
}
