import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import routes from './routerlist'
import Routerview from './routerview'
//引入全局样式
import '../index.css'
//引入antd样式
import 'antd/dist/antd.css'

export default function Router() {

    return (
       <BrowserRouter>
            <Routerview routes={routes}></Routerview>
       </BrowserRouter>
    )
}
