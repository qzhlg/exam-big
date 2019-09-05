import React, { Component } from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'
export default class Routerview extends Component {
  
    render() {
        const {routes}=this.props
        return (
            <Switch>
            {routes.map((item,index)=>{
                if(!item.redirect){
                    return <Route key={index} path={item.path} render={(props)=>{
                      return  <item.component routes={item.children} {...props}></item.component>
                    }}></Route>
                }else{
                    return <Redirect key={index} from={item.path} to={item.redirect}></Redirect>
                }
            })}
        </Switch>
        )
    }
}
