import { Album } from './../artist/artist-api-response.model';
import { Artist } from '../artist/artist.model';

export interface Song {
    id: number;
    title: string;
    singers: Set<Artist>;
    composers: Set<Artist>;
    releaseDate: string;
    album: Album;
    musicPlayerURL?: string;
    headerImageURL?: string;
    
}
