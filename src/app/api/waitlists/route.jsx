import { getToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const DJANGO_API_WAITLISTS_URL = 'http://127.0.0.1:8000/api/waitlists/';

export async function GET(request) {
  const authToken = await getToken();

  if (!authToken) {
    return NextResponse.json(
      { error: 'Unauthorized: Token not found' },
      { status: 401 }
    );
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(DJANGO_API_WAITLISTS_URL, options);

    if (!response.ok) {
      // It's better to provide some feedback based on the response status
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to fetch waitlist entries', details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Fetch Error:', error); // Logging the error for debugging
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
