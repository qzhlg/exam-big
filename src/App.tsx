import 'antd/dist/antd.css';
import * as React from 'react';
// 引入mobx实例
import {Provider,inject,observer} from 'mobx-react'
import Router from './router'
import store from './store' 
// 引入国际化
import {IntlProvider} from 'react-intl'

// @inject('global')
// @observer
class App extends React.Component {
  constructor(props: Readonly<{}>){
    super(props)
  }
  public render() {
    return (
      <div className="App">
        <Provider {...store}>
        <Router/>
        </Provider>
      </div>
    );
  }
}
export default App
