import styled from 'styled-components';

const WrappeDiv = styled.div`
  display: ${(props) => (props.isFlex ? 'flex' : 'block')};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'stretch')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0px'};
`;

const Div = (props) => {
  return <WrappeDiv {...props} />;
};

export default Div;
