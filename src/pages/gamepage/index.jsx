
import { useParams } from "react-router";
import  useFetchSolution  from "../../hook/useFetchSolution";

export default function GamePage() {
    const { id } = useParams();

    
    
    const initialUrl = `https://api.rawg.io/api/games/${id}?key=4a708d2a9a3b4cc9b286ffa65fd1a1d2`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    return (
        <>
        {error && <h1>{error}</h1>}
        <div className="game-page">
            <div className="style-game-info">
                <p>{data && data.released}</p>
                <h1>{data && data.name}</h1>
                <p>Rating: {data && data.rating}</p>
                <p>About:</p>
                <p>{data && data.description_raw}</p>
                </div>
                <div className="style-game-image">
                    <img src={data && data.background_image} alt={data && data.name} />
                </div>
                </div>
        </>
    )
}