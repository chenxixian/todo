import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import {
  STORAGE_CONFIG_TOKEN,
  UniversalStorage,
  AuthService,
  TokenService
} from '@rucken/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { initializeApp } from './shared/utils/initialize-app';
import { ThemesService } from '@rucken/web';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: STORAGE_CONFIG_TOKEN,
      useClass: UniversalStorage
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService, TokenService, ThemesService]
    }
  ]
})
export class AppServerModule {
  static forRoot() {}
}
