// pages/api/waitlists/index.js

import { useAuth } from '@/components/authProvider';
import { getToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const DJANGO_API_WAITLISTS_URL = 'http://127.0.0.1:8000/api/waitlists/';

export async function GET(request) {
  const authToken = await getToken();
  

  if (!authToken) {
    return NextResponse.json(
      { error: 'Unauthorized: Token not found or expired' },
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
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Forbidden: You do not have access to this resource' },
          { status: 403 }
        );
      } else if (response.status === 404) {
        return NextResponse.json(
          { error: 'Not Found: Waitlist entries not found' },
          { status: 404 }
        );
      }

      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to fetch waitlist entries', details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
