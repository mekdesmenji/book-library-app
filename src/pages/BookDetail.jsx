import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function BookDetail() {
  const location = useLocation();
  const id = location.pathname.replace("/book/", "");
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`https://openlibrary.org/${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>
      {book.description ? (
        <p>
          {typeof book.description === "string"
            ? book.description
            : book.description.value}
        </p>
      ) : (
        <p>No description available.</p>
      )}
      {book.subjects && (
        <div>
          <h3>Subjects:</h3>
          <ul>
            {book.subjects.slice(0, 10).map((subj, i) => (
              <li key={i}>{subj}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
