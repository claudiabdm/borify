import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { ArtistComponent } from './components/artist/artist.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { ModalComponent } from './shared/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { TimeFormatPipe } from './shared/time-format.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArtistInfoComponent } from './components/artist/artist-info/artist-info.component';
import { ArtistAlbumsComponent } from './components/artist/artist-albums/artist-albums.component';
import { ArtistAboutComponent } from './components/artist/artist-about/artist-about.component';
import { ArtistRelatedComponent } from './components/artist/artist-related/artist-related.component';
import { SpotifyApiInterceptor } from './interceptors/spotify-api.interceptor';
import { ArtistTracksComponent } from './components/artist/artist-tracks/artist-tracks.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PlayerComponent,
    HeaderComponent,
    ArtistComponent,
    PlaylistsComponent,
    TimeFormatPipe,
    ModalComponent,
    ArtistInfoComponent,
    ArtistAlbumsComponent,
    ArtistAboutComponent,
    ArtistRelatedComponent,
    ArtistTracksComponent,
  ],
  entryComponents: [ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,


    HttpClientModule
  ],
  providers: [
    TimeFormatPipe,
    { provide: HTTP_INTERCEPTORS, useClass: SpotifyApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
