import { Song } from './../song/song.model';
export interface Artist {
    fullName?: string;
    bio?: string;
    id?: number;
    songs?: Song[];
}
