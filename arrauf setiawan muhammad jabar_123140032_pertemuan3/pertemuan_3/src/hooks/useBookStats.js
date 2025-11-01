import { useMemo } from 'react';

function useBookStats(books) {
  const stats = useMemo(() => {
    const statsByStatus = books.reduce((acc, book) => {
      acc[book.status] = (acc[book.status] || 0) + 1;
      return acc;
    }, { milik: 0, baca: 0, beli: 0 });

    return {
      totalBooks: books.length,
      ...statsByStatus
    };
  }, [books]);

  return stats;
}

export default useBookStats;