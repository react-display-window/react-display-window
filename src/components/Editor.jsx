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
    '& .CodeMirror': {
      fontFamily: '"Fira Code", "monaco", monospaced',
      height: 'auto',
      fontSize: '14px !important',
      lineHeight: '1.8',
    },
    '& .CodeMirror-linenumber': {
      paddingLeft: 8,
      paddingRight: 20,
    },
    '& .CodeMirror-gutters': {
      background: 'rgba(0, 0, 0, 0.4) !important',
    },
    '& .CodeMirror-lines': {
      marginLeft: 8,
    },
  },
});


class Editor extends React.Component {

  componentDidMount() {
    const { value } = this.props;
    this.editor = CodeMirror.fromTextArea(this.textarea, {
      lineNumbers: true,
      mode: 'jsx',
      theme: 'material',
      readOnly: 'nocursor',
    });
    this.editor.getDoc().setValue(value);
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
