import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';

import Editor from './Editor';


const styles = StyleSheet.create({
  playGround: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 0',
  },
  renderZone: {
    padding: 32,
    border: '1px solid rgba(84, 110, 122, 0.3)',
    borderRadius: '0 0 5px 5px',
  },
  sourceZone: {
    width: '100%',
    margin: 0,
    borderRadius: '5px 5px 0 0',
    overflow: 'hidden',
  },
});


class PlayGround extends React.Component {

  state = {
  };

  render() {
    const { children, __code } = this.props;
    return (
      <div className={css(styles.playGround)}>
        <div className={css(styles.sourceZone)}>
          <Editor value={__code} />
        </div>
        <div className={css(styles.renderZone)}>
          {children}
        </div>
      </div>
    );
  }

}


export default PlayGround;
