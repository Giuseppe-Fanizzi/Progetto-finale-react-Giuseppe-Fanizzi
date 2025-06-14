
import CardGame from "../../components/CardGame";

import  useFetchSolution  from "../../hook/useFetchSolution";

export default function Homepage() {
    
    const initialUrl = "https://api.rawg.io/api/games?key=4a708d2a9a3b4cc9b286ffa65fd1a1d2&dates=2024-01-01,2024-12-31&page=1";
    
    const { data, loading, error } = useFetchSolution(initialUrl);
    

    return (
        <>
        <div className="text-center">

            <h1>Welcome to GameLab </h1>
            <h2>Homepage</h2>
        </div>
            <div className="games-grid">
                {error && <p>{error}</p>}
                {data && data.results.map((game) => (
                
                    <CardGame key={game.id} game={game} />
                    
                ))}
                
            </div>
        </>
    );
}
