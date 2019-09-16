import React from 'react'
import {BrowserRouter,HashRouter,Switch} from 'react-router-dom'
import routes from './routerlist'
import Routerview from './routerview'
export default function Router() {
    return (
       <HashRouter>
           <Switch>
           <Routerview routes={routes}></Routerview>
           </Switch>
       </HashRouter>
    )
}
