import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

import React from 'react';
import CodeMirror from 'codemirror';
import { StyleSheet, css } from 'aphrodite-jss';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/material.css';


const styles = StyleSheet.create({
  code: {
    overflow: 'hidden',
    borderRadius: 5,
    '& .CodeMirror': {
      fontFamily: '"Fira Code", "monaco", monospaced',
      padding: '8px',
      height: 'auto',
      fontSize: '14px !important',
      lineHeight: '1.8',
    },
  },
});


class Code extends React.Component {

  componentDidMount() {
    const { children } = this.props;
    this.code = CodeMirror.fromTextArea(this.textarea, {
      lineNumbers: false,
      mode: 'bash',
      theme: 'material',
      readOnly: 'nocursor',
    });
    this.code.getDoc().setValue(children.trim());
  }

  render() {
    return (
      <div className={css(styles.code)}>
        <textarea ref={(ref) => this.textarea = ref} />
      </div>
    );
  }

}


export default Code;
