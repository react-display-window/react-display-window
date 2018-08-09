import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';


const styles = StyleSheet.create({
  toc: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginLeft: -24,
    marginTop: '2em',
    marginBottom: '2em',
  },
  entries: {
    paddingLeft: 24,
  },
  entry: {
    marginBottom: 12,
    cursor: 'pointer',
    color: '#1976D2',
    '&:hover': {
      color: '#0D47A1',
    },
  },
});


const Toc = () => {
  return (
    <div className={css(styles.toc)}>
      <div className={css(styles.entries)}>
        <div className={css(styles.entry)}>› &nbsp;Drawbotics Button</div>
        <div className={css(styles.entries)}>
          <div className={css(styles.entry)}>› &nbsp;Installation</div>
          <div className={css(styles.entry)}>› &nbsp;Example</div>
          <div className={css(styles.entry)}>› &nbsp;Props</div>
          <div className={css(styles.entries)}>
            <div className={css(styles.entry)}>› &nbsp;Table</div>
            <div className={css(styles.entry)}>› &nbsp;Knobs</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Toc;
