// Returns both the index of the mob id in the list if found,
// and a listed boolean that is either true or false.
export const isAlreadyListed = (input) => {
  const {
    id,
    list,
  } = input;

  if (list.length === 0) {
    return {
      listed: false,
      index: -1,
    };
  }

  const index = list.findIndex(member => member.id === id);

  return {
    listed: index !== -1,
    index,
  };
};
