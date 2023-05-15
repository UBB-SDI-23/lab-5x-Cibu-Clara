import {Song} from "./Song";
import {Artist} from "./Artist";

export interface PerformsOn {
    id?: number;
    song?: Song;
    artist?: Artist;
    nr_of_views: number;
    duration: string;
}