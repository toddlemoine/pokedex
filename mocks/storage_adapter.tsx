export const createStorageAdapter = (
  storageKey: string,
  localStorage = window.localStorage
) => {
  return {
    getCachedPokemon: async () => {
      const items = await localStorage.getItem(storageKey);
      return JSON.parse(items);
    },
    setCachedPokemon: async (items) => {
      return await localStorage.setItem(storageKey, JSON.stringify(items));
    },
  };
};
