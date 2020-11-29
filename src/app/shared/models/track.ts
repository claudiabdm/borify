import { Album } from './album';
import { Artist } from './artist';

export interface Track {
  album: Album,
  artists: Artist[],
  disc_number: number,
  duration_ms: number,
  explicit: false,
  id: string,
  name: string,
  preview_url: string,
  track_number: number,
}