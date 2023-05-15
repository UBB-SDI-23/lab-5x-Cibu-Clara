import {Song} from "./Song";
import {Artist} from "./Artist";

export interface PerformsOn {
    id?: number;
    song?: Song;
    song_id?: number;
    artist?: Artist;
    artist_id?: number;
    nr_of_views: number;
    duration: string;
}