'use server';

import { setRefreshToken, setToken } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

const DJANGO_API_LOGIN_URL = 'http://127.0.0.1:8000/api/token/pair';

export async function POST(request) {
  const requestData = await request.json();

  const jsonData = JSON.stringify(requestData);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  };

  try {
    // Call Django API for login
    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();

    if (response.ok) {
      console.log('Login successful:', responseData);
      const { access, refresh } = responseData;

      // Ensure access and refresh tokens are properly extracted
      if (access && refresh) {
        // Set the auth token in a cookie
        await setToken(access);
        await setRefreshToken(refresh);

        return NextResponse.json(
          { loggedIn: true, message: 'Login successful' },
          { status: 200 }
        );
      } else {
        console.error(
          'Missing access or refresh token in response:',
          responseData
        );
        return NextResponse.json(
          { error: 'Invalid response data' },
          { status: 500 }
        );
      }
    } else {
      console.error('Failed to login:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to login' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
