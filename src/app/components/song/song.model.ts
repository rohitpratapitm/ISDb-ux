import { Album } from './../artist/artist-api-response.model';
import { Artist } from '../artist/artist.model';

export interface Song {
    id: number;
    title: string;
    singers: Artist[];
    composers: Artist[];
    releaseDate: string;
    album: Album;
}
