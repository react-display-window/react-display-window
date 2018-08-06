import React from 'react';
import cn from 'classnames';
import hljs from 'highlightjs';
import { StyleSheet, css } from 'aphrodite-jss';

import toJsxString from '../utils/to-jsx-string';

import 'highlightjs/styles/atom-one-dark.css';


const styles = StyleSheet.create({
  playGround: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
    border: '1px solid #ddd',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: '0.85em',
    color: 'rgba(0, 0, 0, 0.6)',
    padding: '0 16px',
    margin: 0,
    background: '#eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  renderZone: {
    background: 'white',
    border: '1px solid #ddd',
    borderLeft: 0,
    borderRight: 0,
    padding: '32px 16px',
  },
  sourceZone: {
    width: '100%',
    margin: 0,
    '& .Code': {
      margin: 0,
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
    hljs.initHighlightingOnLoad();
  }

  componentDidUpdate() {
    hljs.initHighlightingOnLoad();
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
        <div className={css(styles.title)}>
          <h3>Example</h3>
        </div>
        <div className={css(styles.renderZone)}>
          {children}
        </div>
        <div className={css(styles.sourceZone)}>
          <pre className={cn(css(styles.source), 'Code', 'hljs')}>
            <code className="xml">
              {code}
            </code>
          </pre>
        </div>
      </div>
    );
  }

}


export default PlayGround;
