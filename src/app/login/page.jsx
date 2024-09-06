'use client';

const LOGIN_URL = '/api/login';

const LoginPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formDataObject);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };

    // Correctly use the LOGIN_URL variable
    const response = await fetch(LOGIN_URL, requestOptions);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log('logged in');
    } else {
      console.error('Failed to login:', response.status, response.statusText);
    }
  };

  return (
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5">
        <h1 className="text-center text-4xl m-10">Login Here</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="p-2 border rounded"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
