import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { Build } from 'api'
// import { initialState } from 'store/buildsSlice/mock'
import { BuildsState } from 'store/buildsSlice/types'
import { AsyncThunkConfig, RootState } from 'store/types'

export const buildsSliceName = 'builds'

const buildsCountToLoad = 10

const initialState: BuildsState = {
    data: [],

    isLoading: false,
    isLoaded: false,
    isAllLoaded: false,
    loadError: null,

    isModalOpen: false,
}

export const fetchBuilds = createAsyncThunk<Build[], void, AsyncThunkConfig>(
    `${buildsSliceName}/fetch`,
    async (_, { extra: { api }, dispatch }) => {
        const BuildList = await api.getBuildList({
            limit: buildsCountToLoad,
            offset: 0,
        })

        if (BuildList.length === 0) {
            dispatch(allLoaded())
        }

        /** Custom metric: buildListLoaded */
        dispatchEvent(new Event('buildListLoaded'))

        return BuildList
    }
)

export const moreBuilds = createAsyncThunk<Build[], void, AsyncThunkConfig>(
    `${buildsSliceName}/more`,
    async (_, { extra: { api }, getState, dispatch }) => {
        /** Custom metric: showMoreButtonPressed */
        dispatchEvent(new Event('showMoreButtonPressed'))

        const BuildList = await api.getBuildList({
            limit: buildsCountToLoad,
            offset: getState()[buildsSliceName].data.length,
        })

        if (BuildList.length === 0) {
            dispatch(allLoaded())
        }

        return BuildList
    }
)

export const buildsSlice = createSlice({
    name: buildsSliceName,
    initialState,

    reducers: {
        allLoaded(state: BuildsState) {
            state.isAllLoaded = true
        },
        openModal(state: BuildsState) {
            state.isModalOpen = true
        },
        closeModal(state: BuildsState) {
            state.isModalOpen = false
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBuilds.pending, (state: BuildsState) => {
                state.isLoading = true
                state.isLoaded = false
                state.isAllLoaded = false
                state.loadError = null
            })
            .addCase(
                fetchBuilds.fulfilled,
                (state: BuildsState, action: PayloadAction<Build[]>) => {
                    state.data = action.payload
                    state.isLoading = false
                    state.isLoaded = true
                }
            )
            .addCase(fetchBuilds.rejected, (state: BuildsState) => {
                state.isLoading = false
                state.loadError = 'Ошибка запроса'
            })

            .addCase(moreBuilds.pending, (state: BuildsState) => {
                state.isLoading = true
                state.isLoaded = false
                state.loadError = null
            })
            .addCase(
                moreBuilds.fulfilled,
                (state: BuildsState, action: PayloadAction<Build[]>) => {
                    state.data.push(...action.payload)
                    state.isLoading = false
                    state.isLoaded = true
                }
            )
            .addCase(moreBuilds.rejected, (state: BuildsState) => {
                state.isLoading = false
                state.loadError = 'Ошибка запроса'
            })
    },
})

/** Reducer */

export const { reducer: buildsReducer } = buildsSlice

/** Selectors */

export const getBuilds = () => (state: RootState) => state[buildsSliceName]

/** Actions */

export const { allLoaded, openModal, closeModal } = buildsSlice.actions
