import { TestBed } from '@angular/core/testing';

import { SpotifyApiInterceptor } from './spotify-api.interceptor';

describe('SpotifyApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpotifyApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpotifyApiInterceptor = TestBed.inject(SpotifyApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
