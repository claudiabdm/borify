import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistAlbumsComponent } from './components/artist/artist-albums/artist-albums.component';
import { ArtistAboutComponent } from './components/artist/artist-about/artist-about.component';
import { ArtistRelatedComponent } from './components/artist/artist-related/artist-related.component';
import { ArtistComponent } from './components/artist/artist.component';

const routes: Routes = [
  {
    path: 'artist/:id',
    component: ArtistComponent,
    children:
      [
        { path: 'albums', component: ArtistAlbumsComponent },
        { path: 'about', component: ArtistAboutComponent },
        { path: 'related', component: ArtistRelatedComponent },
      ]
  },
  { path: '', redirectTo: '/artist/3AA28KZvwAUcZuOKwyblJQ/albums', pathMatch: 'full' },
  { path: '**', redirectTo: '/artist/3AA28KZvwAUcZuOKwyblJQ/albums', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
