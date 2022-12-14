import styled from 'styled-components';

const InfoP = styled.p`
  white-space: pre-line;
`;

const WrappedInput = ({
  id,
  label,
  value,
  placeholder = '',
  onChange = (e) => {},
  onKeyDown = (e) => {},
  info,
}) => {
  const infoPId = `info-${id}`;
  return (
    <div className='form-floating col-auto'>
      <input
        className='form-control'
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-describedby={`${infoPId}`}
      />
      <label className='' htmlFor={id}>
        {label}
      </label>

      {info ? (
        <InfoP id={infoPId} aria-live='polite'>
          {info}
        </InfoP>
      ) : null}
    </div>
  );
};

export default WrappedInput;
