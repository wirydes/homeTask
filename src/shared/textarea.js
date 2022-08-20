import styled from 'styled-components';

const InfoP = styled.p`
  white-space: pre-line;
`;

const WrappedTextArea = ({
  id,
  label,
  value,
  onChange = (e) => {},
  onKeyDown = (e) => {},
  info,
}) => {
  const infoPId = `info-${id}`;
  return (
    <div className='col-auto'>
      <label className='form-label' htmlFor={id}>
        {label}
      </label>
      <textarea
        className='form-control'
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
    </div>
  );
};

export default WrappedTextArea;
