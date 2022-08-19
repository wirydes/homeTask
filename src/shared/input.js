import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border: none;
`;

const Label = styled.label``;
const Input = styled.input``;

const WrappedInput = (props) => (
  <Fieldset>
    <Label>{props.label}</Label>
    <Input defaultValue={props.value} onChange={props.onChange} />
  </Fieldset>
);

export default WrappedInput;
