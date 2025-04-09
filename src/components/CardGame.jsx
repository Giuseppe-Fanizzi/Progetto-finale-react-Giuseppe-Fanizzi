import LazyLoadGameImage from "./LazyLoadGameImage";
import {Link} from "react-router";

export default function Card({ game }) {
    const genres = game.genres.map((genre) => genre.name).join(", ");
    return (
        <div className="games-grid">

        <div className="game game-card" key={game.id}>
             <LazyLoadGameImage image={game.background_image} />
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p>
            <p>Release Date: {game.released}</p>
            <p>Genres: {genres}</p>
           <button className="btn">
            <Link to={`/games/${game.slug}/${game.id}`}>visita il gioco</Link>
            </button>
        </div>
        </div>
    )
};