import { formatDate } from '@/lib/formatDate';

export default function WaitlistsTable({ displayData }) {
  return (
    <div className="text-sm font-[family-name:var(--font-geist-mono)]">
      <table className="w-full border-collapse dark:text-secondary-foreground">
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
  );
}
