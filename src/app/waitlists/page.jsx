'use client';

import { useAuth } from '@/components/authProvider';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import BaseLayout from '@/components/layout/baseLayout';

// Constants
const WAITLIST_API_URL = '/api/waitlists';

// Utility function to format date as yyyy-mm-dd
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function WaitlistPage() {
  const { data, error } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth();
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect();
    }
  }, [auth, error]);

  // Filter data based on search ID
  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchId) {
      try {
        const specificWaitlist = await fetcher(
          `/api/waitlists/${searchId}` // Updated URL
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

  return (
    <BaseLayout>
      <div className="my-12">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              className="border p-2 mr-2"
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
        <div className="text-sm font-[family-name:var(--font-geist-mono)]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Updated</th>
                <th className="border p-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {displayData?.length > 0 ? (
                displayData.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.email}</td>
                    <td className="border p-2">{formatDate(item.updated)}</td>
                    <td className="border p-2">{formatDate(item.timestamp)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </BaseLayout>
  );
}
