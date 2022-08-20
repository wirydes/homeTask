import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border: none;
`;

const Label = styled.label``;
const Input = styled.input``;
const InfoP = styled.p`
  white-space: pre-line;
`;

const WrappedInput = ({ id, label, value, onChange, onKeyDown, info }) => {
  const infoPId = `info-${id}`;
  return (
    <Fieldset>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        aria-describedby={`${infoPId}`}
      />
      {info ? (
        <InfoP id={infoPId} aria-live='polite'>
          {info}
        </InfoP>
      ) : null}
    </Fieldset>
  );
};

export default WrappedInput;
