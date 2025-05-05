import LazyLoadGameImage from "./LazyLoadGameImage";
import {Link} from "react-router";
import './css/cardgame.css'



export default function Card({ game }) {
    const genres = game.genres.map((genre) => genre.name).join(", ");
    return (
        

        <div className=" game-card " key={game.id}>
             <LazyLoadGameImage image={game.background_image} />
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p>
            <p className="release-date-anim">Release Date: {game.released}</p>
            <p>Genres: {genres}</p>
           <a className="btn-cyberpunk pulse">
            <Link to={`/games/${game.slug}/${game.id}`}>visita il gioco</Link>
            </a>
        </div>
        
    )
};