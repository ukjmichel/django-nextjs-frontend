'use client';

import { useAuth } from '@/components/authProvider';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import BaseLayout from '@/components/layout/baseLayout';
import WaitlistsTable from '@/components/waitlistsTable';

// Constants
const WAITLIST_API_URL = '/api/waitlists';

// Utility function to format date as yyyy-mm-dd

export default function WaitlistPage() {
  const auth = useAuth();
  const { data, error } = useSWR(WAITLIST_API_URL, (url) =>
    fetcher(url, 'GET', '')
  ); // Adjust fetcher parameters

  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  // useEffect(() => {
  //   if (error?.status === 401) {
  //     auth.loginRequiredRedirect();
  //   }
  // }, [auth, error]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      auth.loginRequiredRedirect();
    }
  }, []);

  // Filter data based on search ID
  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchId) {
      try {
        const token = ''; // Get token if needed
        const specificWaitlist = await fetcher(
          `/api/waitlists/${searchId}`,
          'GET',
          token
        );
        console.log(specificWaitlist);
        setFilteredData([specificWaitlist]); // Set filtered data to display the single result
      } catch (err) {
        console.error('Error fetching specific waitlist:', err);
        setFilteredData([]); // Reset if error occurs
      }
    } else {
      // If no search ID is provided, reset the filtered data
      setFilteredData(null); // Show all data if no search is performed
    }
  };

  if (!data && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    ); // Improved loading state with centering
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Failed to load. Please try again later.</p>
      </div>
    ); // More descriptive error message
  }

  // Use either filtered data or the full data set
  const displayData = filteredData || data;

  if (auth.isAuthenticated) {
    return (
      <BaseLayout>
        <div className="my-12">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex items-center">
              <input
                type="text"
                className="border p-2 mr-2 dark:text-secondary-foreground"
                placeholder="Enter waitlist ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Search
              </button>
            </div>
          </form>

          {/* Waitlist Table */}
          <WaitlistsTable displayData={displayData} />
        </div>
      </BaseLayout>
    );
  }
}
