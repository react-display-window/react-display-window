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
  editor: {
    overflow: 'hidden',
    borderRadius: 5,
    border: '2px solid rgba(0, 0, 0, 0.5)',
    '& .CodeMirror': {
      fontFamily: '"Fira Code", "monaco", monospaced',
      padding: '8px 0',
      height: 'auto',
      fontSize: '14px !important',
      lineHeight: '1.8',
    },
  },
});


class Editor extends React.Component {

  componentDidMount() {
    const { children } = this.props;
    this.editor = CodeMirror.fromTextArea(this.textarea, {
      lineNumbers: false,
      mode: 'bash',
      theme: 'material',
      readOnly: 'nocursor',
    });
    this.editor.getDoc().setValue(children.trim());
  }

  render() {
    return (
      <div className={css(styles.editor)}>
        <textarea ref={(ref) => this.textarea = ref} />
      </div>
    );
  }

}


export default Editor;
