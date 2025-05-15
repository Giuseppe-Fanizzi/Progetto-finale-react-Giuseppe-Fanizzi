import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ game }) {
    const {favorites, addFavorites, removeFavorites} = useContext(FavoritesContext);

    if (!game) return null;

    const isFavorite = () => favorites.find((el) => +el.game_id === game.id);

    return (
        <div>
            {isFavorite() ? (
                <button onClick={() => removeFavorites(game.id)}>
                    <FaHeart />
                </button>
            ) : (
                <button onClick={() => addFavorites(game)}>
                    <FaRegHeart />
                </button>
            )}
        </div>
    );
}