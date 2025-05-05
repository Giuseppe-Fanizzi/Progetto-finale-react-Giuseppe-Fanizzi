import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import  useFetchSolution  from "../../hook/useFetchSolution";

export default function SearchPage() {
  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");

  const initialUrl = `https://api.rawg.io/api/games?key=4a708d2a9a3b4cc9b286ffa65fd1a1d2&search=${game}`;

  const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);

  return (
    <div className="container">
      <h1>Risultati per: {game} game</h1>
      {loading && <p>loading...</p>}
      {error && <h1>{error}</h1>}
      <div className=" games-grid">
        {data &&
          data.results.map((game) => (
            <CardGame key={game.id} game={game} />
          ))}
      </div>
    </div>
  );
}
