import P from './p';
const Chip = ({ onClick, text, control }) => {
  return (
    <div className='chip'>
      <P onClick={onClick}>
        {control}: {text}
      </P>
    </div>
  );
};

export default Chip;
