import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';


const styles = StyleSheet.create({
  layout: {
    background: '#EDEDEE',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: 900,
    background: 'white',
    padding: 64,
    margin: 32,
    borderRadius: 5,
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
});


const Layout = ({
  children,
}) => {
  return (
    <div className={css(styles.layout)}>
      <div className={css(styles.container)}>
        {children}
      </div>
    </div>
  );
};


export default Layout;
