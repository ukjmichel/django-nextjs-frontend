'use server';

import { cookies } from 'next/headers';
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
      const authToken = responseData.access;

      // Set the auth token in a cookie
      cookies().set({
        name: 'auth-token',
        value: authToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // Secure only in production
        maxAge: 3600, // 1 hour
      });

      return NextResponse.json(
        { message: 'Login successful', cookie: authToken },
        { status: 200 }
      );
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
