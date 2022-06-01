import { configureStore } from '@reduxjs/toolkit'

import { Api, testModeQuery } from 'api'
import {
    buildDetailsSliceName,
    buildDetailsReducer,
} from 'store/buildDetailsSlice'
import { buildsSliceName, buildsReducer } from 'store/buildsSlice'
import { newBuildSliceName, newBuillReducer } from 'store/newBuildSlice'
import { settingsSliceName, settingsReducer } from 'store/settingsSlice'

const params = new URLSearchParams(document.location.search)
const testMode = !!params.get(testModeQuery)

export const store = configureStore({
    reducer: {
        [buildsSliceName]: buildsReducer,
        [buildDetailsSliceName]: buildDetailsReducer,
        [settingsSliceName]: settingsReducer,
        [newBuildSliceName]: newBuillReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: { extraArgument: { api: new Api(testMode) } },
        }),
})
