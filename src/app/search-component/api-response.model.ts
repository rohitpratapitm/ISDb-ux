import { AlbumInfo } from './../song/song-info.model';

import { Lyrics } from './../lyric/lyrics.model';
import { Track, TrackInfo } from './../track/track.model';
import { ArtistInfo, Artist, Album } from '../song/song-info.model';


export interface ApiResponse {
    success: boolean;
    length: number;
    result: ArtistInfo[] | Artist | Track | TrackInfo | Lyrics | Album | AlbumInfo;
}
