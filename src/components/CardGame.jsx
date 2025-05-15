import LazyLoadGameImage from "./LazyLoadGameImage";
import {Link} from "react-router";
import './css/cardgame.css'



export default function Card({ game }) {
    const genres = game.genres.map((genre) => genre.name).join(", ");
    return (
        

        <div className=" game-card" key={game.id}>
             <LazyLoadGameImage image={game.background_image} />
             <div className="game-card-content">

            <h2 className="game-title">{game.name}</h2>
            <p>Rating: {game.rating}</p>
            <p className="release-date-anim">Release Date: {game.released}</p>
            <p>Genres: {genres}</p>
            <div className="game-card-footer">

           <a href={`/games/${game.slug}/${game.id}`} 
           className="btn-cyberpunk pulse">
            visita il gioco
            </a>
            </div>
             </div>
        </div>
        
    )
};