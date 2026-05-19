import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideQuillConfig } from 'ngx-quill';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: true
      }
    })

  ]
};
