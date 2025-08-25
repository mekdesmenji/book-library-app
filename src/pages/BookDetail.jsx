import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export function BookDetail() {
  const location = useLocation();
  const id = location.pathname.replace("/book/", "");
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`https://openlibrary.org/${id}.json`);
        const data = await res.json();

        if (data.authors && data.authors.length > 0) {
          const authorRes = await fetch(
            `https://openlibrary.org${data.authors[0].author.key}.json`
          );
          const authorData = await authorRes.json();
          setAuthor(authorData);
        }

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

  const coverImg = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      <Link
        to="/home"
        className="absolute lg:top-6 lg:left-[-170px] font-bold text-3xl transition"
      >
        ←
      </Link>

      <div className="lg:flex lg:gap-16 grid gap-8 pt-24 items-center">
        <img
          src={coverImg}
          alt={book.title}
          className="w-48 h-auto rounded-lg shadow m-auto lg:m-0"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

          {author && (
            <div className="flex items-center gap-3 mb-4">
              <img
                src={
                  author.photos
                    ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-M.jpg`
                    : "https://via.placeholder.com/50?text=No+Image"
                }
                className="w-12 h-12 rounded-full object-cover shadow"
              />
              <p className="text-lg font-medium">{author.name}</p>
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-600">(123 reviews)</span>
          </div>
        </div>
      </div>

      <div className="lg:mt-8 ">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p className="text-gray-700">
          {typeof book.description === "string"
            ? book.description
            : book.description?.value || "No description available."}
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Publication Date:</strong> {book.first_publish_date || "N/A"}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn ? book.isbn.join(", ") : "N/A"}
        </p>
        <p>
          <strong>Number of Pages:</strong> {book.number_of_pages || "N/A"}
        </p>
        <p>
          <strong>Subjects:</strong>
          {book.subjects ? book.subjects.slice(0, 8).join(", ") : "N/A"}
        </p>
      </div>
    </div>
  );
}
