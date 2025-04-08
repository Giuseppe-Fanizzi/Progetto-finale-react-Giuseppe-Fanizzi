
import { useState,useEffect } from "react";
import { Link } from 'react-router';

export default function GenresDropdown() {
const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);
  


const initialUrl = "https://api.rawg.io/api/genres?key=4a708d2a9a3b4cc9b286ffa65fd1a1d2"

const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setGenres(json);
    } catch (error) {
      setError(error.message);
      setGenres(null);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <ul>
        {genres && genres.results.map((genre) => (
          <li key={genre.id}>
            <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>

    </>
  );
};