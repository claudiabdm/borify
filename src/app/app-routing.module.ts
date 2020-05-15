import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistAlbumsComponent } from './components/artist/artist-albums/artist-albums.component';
import { ArtistAboutComponent } from './components/artist/artist-about/artist-about.component';
import { ArtistRelatedComponent } from './components/artist/artist-related/artist-related.component';

const routes: Routes = [
  {path: 'artist/albums', component: ArtistAlbumsComponent},
  {path: 'artist/about', component: ArtistAboutComponent},
  {path: 'artist/related', component: ArtistRelatedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
