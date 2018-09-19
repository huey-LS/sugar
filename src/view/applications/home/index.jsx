import React from 'react';
import ReactDom from 'react-dom';

export default class App extends React.Component {
  constructor () {
    super();
    if (process.env.VIEW_ENV === 'server') {
      console.log('服务端渲染2');
    } else {
      console.log('客户端渲染4');
    }
  }

  render () {
    const { user } = this.props;
    return (
      <div>
        {user} welcome!!
      </div>
    )
  }
}

if (process.env.VIEW_ENV !== 'server') {
  ReactDom.render(<App {...window.__initialize_data__} />, document.getElementById('application'))
}
