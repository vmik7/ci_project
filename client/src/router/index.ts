import { BuildDetails } from 'pages/BuildDetails/BuildDetails'
import { BuildList } from 'pages/BuildList/BuildList'
import { Settings } from 'pages/Settings/Settings'
import { Start } from 'pages/Start/Start'
import { Route } from 'router/types'
import { fetchBuildById, fetchLogById } from 'store/buildDetailsSlice'
import { fetchBuilds } from 'store/buildsSlice'
import { fetchSettings } from 'store/settingsSlice'

export const routes: Route[] = [
    {
        path: '/',
        component: BuildList,
        contentClass: 'app__content',
        loadData: (dispatch) => {
            dispatch(fetchSettings())
            dispatch(fetchBuilds())
        },
    },
    {
        path: '/start',
        component: Start,
        contentClass: 'app__content app__content_center',
        loadData: () => {},
    },
    {
        path: '/build/:id',
        component: BuildDetails,
        contentClass: 'app__content',
        loadData: (dispatch, id) => {
            dispatch(fetchSettings())
            dispatch(fetchBuildById(id))
            dispatch(fetchLogById(id))
        },
    },
    {
        path: '/settings',
        component: Settings,
        contentClass: 'app__content',
        loadData: (dispatch) => {
            dispatch(fetchSettings())
        },
    },
]
