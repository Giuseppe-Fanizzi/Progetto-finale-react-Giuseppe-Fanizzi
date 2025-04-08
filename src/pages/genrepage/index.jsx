
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import  useFetchSolution  from "../../hook/useFetchSolution";


export default function GenrePage() {
    const { genre } = useParams();

    
    
    const initialUrl = `https://api.rawg.io/api/games?key=4a708d2a9a3b4cc9b286ffa65fd1a1d2&genres=${genre}&page=1`;
    
    const { data, loading, error,  } = useFetchSolution(initialUrl);


    return (
        <>
           <h2>welcome to {genre} page</h2>
           <div className="grid-game-list">
            {error && <article>{error}</article> }
            {data && 
            data.results.map((game) => <CardGame key={game.id} game={game}/>)}
            </div>
        </>
    );
}