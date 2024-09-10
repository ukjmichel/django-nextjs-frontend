'use client';

import { useAuth } from '@/components/authProvider';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import BaseLayout from '@/components/layout/baseLayout';
import WaitlistsTable from '@/components/waitlistsTable';
import WaitlistForm from './forms';
import { Button } from '@/components/ui';

// Constants
const WAITLIST_API_URL = '/api/waitlists';

export default function WaitlistPage() {
  const auth = useAuth();
  const { data, error } = useSWR(WAITLIST_API_URL, (url) =>
    fetcher(url, 'GET', '')
  ); // Adjust fetcher parameters

  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      auth.loginRequiredRedirect();
    }
  }, [auth]);

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
        <div className=" my-12">
          {/* Search Form and Toggle Button */}
          <div className="flex flex-col">
            {!showForm ? (
              <form onSubmit={handleSearch} className="mb-6 m-auto">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="border p-2 mr-2 dark:text-secondary-foreground"
                    placeholder="Enter waitlist ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                  <Button type="submit" className="px-4 py-2">
                    Search
                  </Button>
                </div>
              </form>
            ) : null}
            <Button
              onClick={() => setShowForm(!showForm)}
              className="mb-4 px-4 py-2"
            >
              {showForm ? 'Show Waitlists' : 'Add Waitlist'}
            </Button>
          </div>

          {/* Conditional rendering based on showForm state */}
          {showForm ? (
            <WaitlistForm />
          ) : (
            <WaitlistsTable displayData={displayData} />
          )}
        </div>
      </BaseLayout>
    );
  }
}
