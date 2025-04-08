import "../global.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {
    return (
        <LazyLoadImage
        alt="game image"
            effect="blur"
            className="game-image"
            wrapperProps={{
                style: {transitionDelay : "0.5s"},
            }}
            src={image}
        />
    );
}