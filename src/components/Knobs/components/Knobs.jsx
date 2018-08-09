import React from 'react';
import merge from 'lodash/merge';
import { StyleSheet, css } from 'aphrodite-jss';

import { getProps } from '../utils';
import Prop from './Prop';


const styles = StyleSheet.create({
  knobs: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
    marginBottom: 30,
    border: '1px solid rgba(84, 110, 122, 0.3)',
    overflow: 'hidden',
    borderRadius: 5,
  },
  renderZone: {
    background: 'rgba(84, 110, 122, 0.03)',
    borderLeft: 0,
    borderRight: 0,
    padding: 32,
  },
  knobsZone: {
    borderTop: '1px solid rgba(84, 110, 122, 0.3)',
    padding: 32,
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -16px',
  },
  knob: {
    width: '50%',
    padding: '0 16px',
  },
});


class Knobs extends React.Component {

  state = {
    propValues: {},
  };

  render() {
    const { defaults, children } = this.props;
    const Component = children.type;
    const componentPropTypes = getProps(Component);
    const { propValues } = this.state;
    const finalProps = merge({}, defaults, propValues);
    return (
      <div className={css(styles.knobs)}>
        <div className={css(styles.renderZone)}>
          {React.cloneElement(children, {
            ...finalProps,
          })}
        </div>
        <div className={css(styles.knobsZone)}>
          {Object.keys(componentPropTypes).map((key) => (
            <div key={key} className={css(styles.knob)}>
              <Prop
                name={key}
                prop={componentPropTypes[key]}
                value={finalProps[key]}
                onChange={(v, n) => this.setState({ propValues: { ...propValues, [n]: v } })} />
            </div>
          ))}
        </div>
      </div>
    );
  }

}


export default Knobs;
