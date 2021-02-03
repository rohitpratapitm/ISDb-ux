export interface Track {
    id_track: number;
    track: string;
    bpm: number; // false (Boolean: if not found);
    api_track: string;
    api_lyrics: string;
    album?: string;
    artist?: string;
    haslyrics?: boolean;
}

export interface TrackInfo {
    id_track?: number;
    album: string;
    id_album: number;
    id_artist: number;
    artist: string;
    cover: string;
    label: string;
    explicit: boolean;
    api_artist: string;
    api_albums: string;
    api_album: string;
    api_tracks: string;
    tracks: Track[];
}
