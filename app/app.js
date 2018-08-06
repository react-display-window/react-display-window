import React from 'react';


class App extends React.Component {
  render() {
    const { page: Page } = this.props;
    return (
      <Page />
    );
  }
}


export default App;
