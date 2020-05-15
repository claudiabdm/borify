import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistAlbumsComponent } from './components/artist-albums/artist-albums.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'artist/albums', component: ArtistAlbumsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
