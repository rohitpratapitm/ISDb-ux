import { Album } from './../artist/artist-api-response.model';
import { Artist } from '../artist/artist.model';

/**
 * Song interface containing properties to be shown on UI
 */
export interface Song {
    id: number;
    title: string;
    singers: Set<Artist>;
    composers: Set<Artist>;
    releaseDate: string;
    album: Album;
    musicPlayerURL?: string;
    headerImageURL?: string;
    lyricsPath?: string;
    lyricsURL?: string;
}
