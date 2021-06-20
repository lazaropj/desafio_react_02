import { useEffect, useState } from 'react';

import { Button } from '../components/Button';

import { GenreResponseProps } from './GenreResponseProps';

import { api } from '../services/api';

interface SideBarI {
  handleClickButton(id: number): void;
  selected: number;
}

export function SideBar({handleClickButton, selected}: SideBarI) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}