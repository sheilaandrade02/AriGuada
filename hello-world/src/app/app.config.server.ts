import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { SwapiService } from './swapi.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),SwapiService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
