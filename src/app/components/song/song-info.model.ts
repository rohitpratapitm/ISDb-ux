export interface Result {
    artist: string;
    id_artist: number;
    length?: number;
}
export interface SongInfo {
    singerName: string;
    releaseYear?: string;
    lyrics?: string;
    albumName?: string;
}

export interface ArtistInfo extends Result {
    api_artist: string;
    api_albums: string;
}

export interface Artist extends Result{
    mbid: string;
    gender: string;
    country: string;
    youtube: string;
    instagram: string;
    twitter: string;
    facebook: string;
    website: string;
    spotify: string;
    api_albums: string;
}

export interface AlbumInfo {
    artist: string;
    id_artist: number;
    length: number;
    albums: Album[];
}

export interface Album extends Result{
    album: string;
    id_album: number;
    cover: string;
    api_album: string;
    api_tracks: string;

    upc?: string;
    asin?: string;
    mbid?: string;
    genres?: [];
    realease?: string;
    label?: string;
    explicit?: boolean;
}
