export const handleEnter = (e, fn) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    fn();
  }
};
