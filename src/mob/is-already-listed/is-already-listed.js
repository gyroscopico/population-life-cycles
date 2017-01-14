// Returns the index of the mob id in the list if found,
// or returns false if not found.
export const isAlreadyListed = (input) => {
  const {
    id,
    list,
  } = input;

  const index = list.findIndex(member => member.id === id);

  return index !== -1 ? index : false;
};
