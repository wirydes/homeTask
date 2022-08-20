import styled from 'styled-components';

const WrappeDiv = styled.div`
  display: ${(props) => (props.isFlex ? 'flex' : 'block')};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
`;

const Div = (props) => {
  return <WrappeDiv {...props} />;
};

export default Div;
