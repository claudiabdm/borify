import { Artist } from './artist';
import { Track } from './track';

export interface Album {
  id: string,
  artist?: Artist[],
  href?: string,
  images?:  {height: string, url: string, width: string}[],
  name?: string,
  release_date?: string,
  total_tracks?: number,
  tracks?: Track[]
}