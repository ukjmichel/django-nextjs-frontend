'use server';

import { cookies } from 'next/headers';

const TOKEN_NAME = 'auth-token';
const TOKEN_REFRESH_NAME = 'auth-refresh-token';
const TOKEN_AGE = 3600;

export async function getToken() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth-token');
  console.log('Retrieved Cookie:', authToken);
  if (!authToken || !authToken.value) {
    console.error('Token not found or empty');
  }
  return authToken?.value || null;
}

export async function setToken(token) {
  const cookieStore = cookies();
  if (!token) {
    console.error('Cannot set token. Provided token is empty.');
    return;
  }
  cookieStore.set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Secure only in production
    maxAge: 3600, // 1 hour
  });
}

export async function deleteToken() {
  const cookieStore = cookies();
  cookieStore.delete(TOKEN_NAME, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Secure only in production
  });
}

export async function setRefreshToken(token) {
  const cookieStore = cookies();
  if (!token) {
    console.error('Cannot set refresh token. Provided token is empty.');
    return;
  }
  cookieStore.set({
    name: TOKEN_REFRESH_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Secure only in production
    maxAge: TOKEN_AGE, // 1 hour
  });
}

export async function deleteRefreshToken() {
  const cookieStore = cookies();
  cookieStore.delete(TOKEN_REFRESH_NAME, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Secure only in production
  });
}

// Example usage in an async function
export async function someFunction() {
  const authToken = await getToken();
  if (!authToken) {
    console.error('Authentication token is missing or empty');
    return;
  }
  console.log('Auth Token:', authToken); // Use the token as needed

  // You can now use `authToken` in your logic
}
