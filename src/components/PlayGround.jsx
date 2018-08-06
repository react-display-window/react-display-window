import React from 'react';
import cn from 'classnames';
import hljs from 'highlightjs';
import { StyleSheet, css } from 'aphrodite-jss';

import toJsxString from '../utils/to-jsx-string';

import 'highlightjs/styles/foundation.css';


const styles = StyleSheet.create({
  playGround: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 0',
    borderRadius: 5,
    border: '1px solid rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  },
  renderZone: {
    padding: '32px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  },
  sourceZone: {
    width: '100%',
    margin: 0,
    '& .Code': {
      margin: 0,
      padding: '24px 16px',
    },
  },
});


function getCode(children) {
  return React.Children.map(children, (child) => toJsxString(child) + '\n').join('');
}


class PlayGround extends React.Component {

  state = {
    code: '',
    prevComputedCode: null,
  };

  componentDidMount() {
    hljs.initHighlighting();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children } = nextProps;
    const { prevComputedCode } = prevState;
    const code = getCode(children);

    if (prevComputedCode === code) {
      return null;
    }

    return { code, prevComputedCode: code };
  }

  render() {
    const { children } = this.props;
    const { code } = this.state;
    return (
      <div className={css(styles.playGround)}>
        <div className={css(styles.renderZone)}>
          {children}
        </div>
        <div className={css(styles.sourceZone)}>
          <pre className={cn(css(styles.source), 'Code', 'hljs')}>
            <code className="react">
              {code}
            </code>
          </pre>
        </div>
      </div>
    );
  }

}


export default PlayGround;
