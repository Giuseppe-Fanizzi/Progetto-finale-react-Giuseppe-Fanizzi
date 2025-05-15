import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

const favoriteGameUI = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container">
      <h2>Ciao {session?.user.user_metadata.first_name} 👋🏻</h2>
      <details className="dropdown">
        <summary>i tuoi giochi preferiti </summary>
        {favorites.length === 0 && <p>Non ci sono favoriti al momento...</p>}
        <ul>
          {favorites.map((game) => (
            <li key={game.id} style={favoriteGameUI}>
              <div>
                <img
                  width={200}
                  height={150}
                  src={game.game_image}
                  alt=""
                />
                <p>{game.game_name}</p>
              </div>
              <button
                className="secondary"
                onClick={() => removeFavorite(game.game_id)}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}