import { FC } from 'react'

import { BasePageProps } from 'types'

export interface Route extends BasePageProps {
    path: string
    component: FC<any>
}
