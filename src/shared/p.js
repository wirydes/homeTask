import styled from 'styled-components';

const P = styled.p`
  color: ${(props) => (props.color ? props.color : 'black')};
  background: ${(props) =>
    props.background ? props.background : 'transparent'};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1em')};
  border: ${(props) => (props.border ? props.border : 'none')};
`;

export default P;
