import React from 'react';

import Layout from './components/Layout';
import components from './utils/mdx-components';


class App extends React.Component {
  render() {
    const { page: Page } = this.props;
    return (
      <Layout>
        <Page components={components} />
      </Layout>
    );
  }
}


export default App;
