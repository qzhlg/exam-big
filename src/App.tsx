import 'antd/dist/antd.css';
import * as React from 'react';

import {Provider} from 'mobx-react'
import Router from './router'
import store from './store' 



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
