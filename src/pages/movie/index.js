import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movie, setMovie] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        // Buscar dados do filme
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                const res = data.results;
                let filme = res.find((key) => {
                    // eslint-disable-next-line
                    return key.id == id;
                });
                setMovie(filme);
            });

        // Buscar trailer do filme
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                const trailers = data.results;
                // Procurar por trailer no YouTube
                const youtubeTrailer = trailers.find(
                    (video) => video.site === "YouTube" && 
                    (video.type === "Trailer" || video.type === "Teaser")
                );
                setTrailer(youtubeTrailer);
            })
            .catch((error) => {
                console.error("Erro ao buscar trailer:", error);
            });
    }, [id, KEY]);

    const openTrailer = () => {
        setShowTrailer(true);
    };

    const closeTrailer = () => {
        setShowTrailer(false);
    };

    return (
        <div>
            <nav>
                <h1>Movie</h1>
            </nav>
            
            {!showTrailer ? (
                <>
                    <img
                        className="img_movie"
                        src={`${imagePath}${movie.poster_path}`}
                        alt="{movie.title}"
                    />
                    <div className="container">
                        <h1>{movie.title}</h1>
                    
                        <div className="descricao">
                            <h4>Descrição: </h4>
                            <p className="movie-desc">{movie.overview}</p>
                        </div>
                        <h3 className="descricaoaa">Data de lançamento: {movie.release_date}</h3>
                        
                        {trailer && (
                            <button className="link_button trailer-button" onClick={openTrailer}>
                                Ver Trailer
                            </button>
                        )}
                        
                        <Link to="/">
                            <button className="link_button">Voltar</button>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="trailer-page">
                    <div className="trailer-header">
                        <h1>{movie.title} - Trailer</h1>
                        <button className="close-trailer-button" onClick={closeTrailer}>
                            ✕ Fechar
                        </button>
                    </div>
                    
                    <div className="trailer-container">
                        <iframe
                            width="100%"
                            height="500"
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                            title="Trailer do Filme"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    
                    <div className="trailer-actions">
                        <button className="link_button" onClick={closeTrailer}>
                            Voltar aos Detalhes
                        </button>
                        <Link to="/">
                            <button className="link_button">Página Inicial</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie;