import React, { useEffect, useState } from "react";

export const BookList = ({ subject = "romance" }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://openlibrary.org/subjects/${subject}.json?limit=40`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setBooks(data.works);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [subject]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {books.map((book) => {
        const coverUrl = book.cover_id
          ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
          : "https://via.placeholder.com/128x193?text=No+Cover";

        return (
          <div
            key={book.key}
            className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-full h-48 object-cover mb-3 rounded"
            />
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-sm text-gray-600">
              {book.authors && book.authors.length > 0
                ? book.authors.map((author) => author.name).join(", ")
                : "Unknown Author"}
            </p>
          </div>
        );
      })}
    </div>
  );
};
