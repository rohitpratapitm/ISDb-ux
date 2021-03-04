import { Song } from './../song/song.model';
/**
 * Interface to represent Artist
 */
export interface Artist {
    fullName?: string;
    bio?: string;
    id?: number;
    songs?: Set<Song>;
    url?: string;
    imageURL?: string;
    headerImageURL?: string;
}
