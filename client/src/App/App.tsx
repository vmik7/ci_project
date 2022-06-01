import { FC } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Footer } from 'components/Footer/Footer'
import { cn } from 'helpers/cn'
import { routes } from 'router'

import 'App/App.scss'

const block = cn('app')

export const App: FC = () => {
    return (
        <div className={block()}>
            <Routes>
                {routes.map((route) => (
                    <Route path={route.path} key={route.path}>
                        <route.component
                            loadData={route.loadData}
                            contentClass={route.contentClass}
                        />
                    </Route>
                ))}
            </Routes>
            <Footer className={block('footer')} />
        </div>
    )
}
