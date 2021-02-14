
export enum TagType {
    ROOT = 'root',
    PROPERTY = 'p',
    ATTRIBUTE = 'a'
}

export interface Data {
    api_path?: string;
}

export interface AttributeChild {
    children?: PropertyChildren;
}

export interface Attribute {
    href?: string;
    rel?: string;
}

export interface PropertyChildrenContainer {
    tag: string; // "a"
    attributes?: Attribute;
    data?: Data;
    children?: AttributeChild[];
}
export interface PropertyChildren {
    tag: string; // "p"
    children?: (string | PropertyChildrenContainer)[];
}

export interface Dom {
    tag: string; // enum of type TAG.ROOT
    children: PropertyChildren[];
}

export interface Description {
    dom: Dom;
}

export enum HitsEnum {
    Song = 'song'
}

export interface HitsResponse {
    index: string; // song
    type: string; // song..should be an enum
    result: SongResponse;
}

// marker interface
// tslint:disable-next-line:no-empty-interface
export interface ApiResponse {
    //
}

export interface ApiArtistResponse extends ApiResponse{
    artist: ArtistResponse;
}

export interface ApiHitsResponse extends ApiResponse {
    hits: HitsResponse[];
}

export interface ApiSongResponse extends ApiResponse {
    song: SongResponse;
}

export interface Response {
    api_path: string;
    id: number;
    url: string;
    description?: Description;
    name?: string;
}
export interface SongResponse extends Response {
    full_title: string;
    title: string;
    album?: Album;
    lyrics_owner_id: number;
    path: string;
    release_date?: string;
    primary_artist?: ArtistResponse;
    writer_artists?: ArtistResponse[];
}

export interface Album extends Response {
    full_title: string;
    artist: ArtistResponse;
}

export interface ArtistResponse extends Response {
    header_image_url: string;
    image_url: string;
    alternate_names?: string[];
    facebook_name?: string;
    followers_count?: number;
    instagram_name?: string;
}

export interface HttpStatus {
    status: number; // http code like 200
}
export interface ApiResponseWrapper {
    meta: HttpStatus;
    response: ApiResponse;
}

export enum HttpStatusCode {
    SUCCESS = 200,
    NOT_FOUND = 404
}
