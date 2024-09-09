export const fetcher = async (url) => {
  try {
    const res = await fetch(url);

    // Throw an error if the request was not successful
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.status = res.status;
      throw error;
    }

    return res.json(); // Return the JSON data if successful
  } catch (error) {
    // Handle errors, you can log or process the error here
    console.error('Fetch error:', error);

    // If the error has a response status, attach it to the error object
    if (error.status) {
      throw new Error(`Error ${error.status}: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
