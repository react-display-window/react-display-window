import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';

import Editor from './Editor';


const styles = StyleSheet.create({
  playGround: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 0',
    borderRadius: 5,
    border: '2px solid rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },
  renderZone: {
    padding: '32px 16px',
  },
  sourceZone: {
    width: '100%',
    margin: 0,
    borderBottom: '2px solid rgba(0, 0, 0, 0.5)',

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
