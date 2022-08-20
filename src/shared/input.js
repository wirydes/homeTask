import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border: none;
`;

const Label = styled.label``;
const Input = styled.input``;
const InfoP = styled.p`
  white-space: pre-line;
`;

const WrappedInput = (props) => {
  const infoPId = `info-${props.id}`;
  return (
    <Fieldset>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        id={props.id}
        defaultValue={props.value}
        onChange={props.onChange}
        aria-describedby={`${infoPId}`}
      />
      {props.info ? (
        <InfoP id={infoPId} aria-live='polite'>
          {props.info}
        </InfoP>
      ) : null}
    </Fieldset>
  );
};

export default WrappedInput;
