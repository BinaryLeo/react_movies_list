import {useState, useEffect} from 'react';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';
interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}
interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}
interface ContentProps{
  selectedGenreId: number;
  selectedGenre: GenreResponseProps; 
}

export function Content({selectedGenreId,selectedGenre}: ContentProps) {
   //Desconstruct SelectedGenreId, and pass as props
  const [movies, setMovies] = useState<MovieProps[]>([])
 
  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data)
      })
  }, [selectedGenreId])

  return (
    <div className="container">
      <header>
        <span className="category">
          Category:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
