import { Track } from './track';

export interface Playlist {
  id: number,
  name: string,
  tracks: Track[] | []
}