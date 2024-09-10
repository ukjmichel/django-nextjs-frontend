export const fetcher = async (url, method = 'GET', token = '', body = null) => {
  try {
    const response = await fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      const error = new Error(`An error occurred: ${errorBody}`);
      error.status = response.status;
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error.message, 'Status:', error.status);
    throw error;
  }
};
