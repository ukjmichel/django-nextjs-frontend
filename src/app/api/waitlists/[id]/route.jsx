'use server';

import { getToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const DJANGO_API_WAITLISTS_URL = 'http://127.0.0.1:8000/api/waitlists/';

export async function GET(request, { params }) {
  const endpoint = params?.id
    ? `${DJANGO_API_WAITLISTS_URL}${params.id}`
    : DJANGO_API_WAITLISTS_URL;

  const authToken = await getToken();

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const endpoint = params?.id
    ? `${DJANGO_API_WAITLISTS_URL}${params.id}`
    : null;

  if (!endpoint) {
    return NextResponse.json(
      { error: 'ID parameter is missing' },
      { status: 400 }
    );
  }

  const authToken = await getAuthToken();

  try {
    const requestData = await request.json();

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const endpoint = params?.id
    ? `${DJANGO_API_WAITLISTS_URL}${params.id}/`
    : null;

  if (!endpoint) {
    return NextResponse.json(
      { error: 'ID parameter is missing' },
      { status: 400 }
    );
  }

  const authToken = await getAuthToken();

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
