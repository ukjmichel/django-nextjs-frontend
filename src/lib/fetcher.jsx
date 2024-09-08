export const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    throw error;
  }
  return res.json();
};
