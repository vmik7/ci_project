import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { Configuration, ConfigurationPostData } from 'api'
// import { initialState } from 'store/settingsSlice/mock'
import { SettingsState } from 'store/settingsSlice/types'
import { AsyncThunkConfig, RootState } from 'store/types'

export const settingsSliceName = 'settings'

const initialState: SettingsState = {
    data: {
        id: '',
        repoName: '',
        buildCommand: 'npm run build',
        mainBranch: 'main',
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

export const fetchSettings = createAsyncThunk<
    Configuration,
    void,
    AsyncThunkConfig
>(`${settingsSliceName}/fetch`, async (_, { extra: { api } }) => {
    const config = await api.getSettings()

    /** Custom metric: settingsLoaded */
    dispatchEvent(new Event('settingsLoaded'))

    return config
})

export const setSettings = createAsyncThunk<
    void,
    ConfigurationPostData,
    AsyncThunkConfig
>(`${settingsSliceName}/post`, async (data, { extra: { api }, dispatch }) => {
    const response = await api.postSettings(data)
    if (response.ok) {
        dispatch(fetchSettings())
    } else {
        throw new Error()
    }
})

export const settingsSlice = createSlice({
    name: settingsSliceName,
    initialState,

    reducers: {
        fieldsChanged(
            state: SettingsState,
            action: PayloadAction<ConfigurationPostData>
        ) {
            state.isChanged =
                state.data.repoName !== action.payload.repoName ||
                state.data.buildCommand !== action.payload.buildCommand ||
                state.data.mainBranch !== action.payload.mainBranch ||
                state.data.period !== action.payload.period
        },
        nullSaveError(state: SettingsState) {
            state.saveError = null
        },
        nullSaveStatus(state: SettingsState) {
            state.isSaved = false
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state: SettingsState) => {
                state.isLoading = true
                state.isLoaded = false
                state.loadError = null
            })
            .addCase(
                fetchSettings.fulfilled,
                (
                    state: SettingsState,
                    action: PayloadAction<Configuration>
                ) => {
                    state.data = action.payload

                    state.isLoading = false
                    state.isLoaded = true

                    state.isChanged = false
                }
            )
            .addCase(fetchSettings.rejected, (state: SettingsState) => {
                state.isLoading = false
                state.loadError = 'Ошибка при загрузке настроек'
            })

            .addCase(setSettings.pending, (state: SettingsState) => {
                state.isSaving = true
                state.isSaved = false
                state.saveError = null
            })
            .addCase(setSettings.fulfilled, (state: SettingsState) => {
                state.isSaving = false
                state.isSaved = true
                state.isChanged = false
            })
            .addCase(setSettings.rejected, (state: SettingsState) => {
                state.isSaving = false
                state.saveError = 'Ошибка сохранения настроек'
            })
    },
})

/** Reducer */

export const { reducer: settingsReducer } = settingsSlice

/** Selectors */

export const getRepoName = () => (state: RootState) =>
    state[settingsSliceName].data.repoName

export const getSettingsData = () => (state: RootState) =>
    state[settingsSliceName].data

export const getLoadingStatus = () => (state: RootState) => {
    return {
        isLoading: state[settingsSliceName].isLoading,
        isLoaded: state[settingsSliceName].isLoaded,
        loadError: state[settingsSliceName].loadError,
    }
}

export const getSavingStatus = () => (state: RootState) => {
    return {
        isChanged: state[settingsSliceName].isChanged,
        isSaving: state[settingsSliceName].isSaving,
        isSaved: state[settingsSliceName].isSaved,
        saveError: state[settingsSliceName].saveError,
    }
}

/** Actions */

export const { nullSaveError, nullSaveStatus, fieldsChanged } =
    settingsSlice.actions
