export const handleEnter = (e, fn) => {
  if (e.key === 'Enter') {
    fn();
  }
};

export const handleComma = (e, fn) => {
  if (e.key === ',') {
    fn();
  }
};
