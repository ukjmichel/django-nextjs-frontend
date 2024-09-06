'use server'; // Ensure this is a server component if working with cookies directly

import { cookies } from 'next/headers';

const TOKEN_NAME = 'auth-token';
const TOKEN_REFRESH_NAME = 'auth-refresh-token';
const TOKEN_AGE = 3600;

export async function getToken() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('TOKEN_NAME');
  return authToken?.value || null;
}

export async function setToken(token) {
  const cookieStore = cookies();
  cookieStore.set({
    name: 'TOKEN_NAME',
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Secure only in production
    maxAge: 3600, // 1 hour
  });
}

export async function deleteToken() {
  const cookieStore = cookies();
  cookieStore.delete('TOKEN_NAME', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Secure only in production
  });
}
export async function setRefreshToken(token) {
  const cookieStore = cookies();
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
