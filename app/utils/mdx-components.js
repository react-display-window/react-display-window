import styled from 'styled-components';

import Code from '../components/Code';


const H1 = styled.h1`
  font-family: 'Bree Serif', serif;
  margin-top: 1em;
  margin-bottom: 1em;
`;


const P = styled.p`
  font-family: 'Open Sans', sans-serif;
  color: rgba(0, 0, 0, 0.8);
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 1em;
`;


const H2 = styled.h2`
  font-family: 'Bree Serif', serif;
  margin-top: 1.5em;
  margin-bottom: 1em;
`;


const H3 = styled.h3`
  font-family: 'Bree Serif', serif;
  margin-top: 1.5em;
  margin-bottom: 1em;
`;


export default {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  code: Code,
};
