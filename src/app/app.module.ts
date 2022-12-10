import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TesteModule } from './teste/teste.module';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentPagesComponent } from './content-pages/content-pages.component';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { SingInModule } from './singIn/singIn.module';
// import { NgxSpinnerModule } from 'ngx-spinner';

registerLocaleData(fr);



import { ToastrModule } from 'ngx-toastr';


import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US, fr_FR } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { DeviseModule } from './content-pages/pages/parametrage/devise/devise.module';
import { UtilisateurModule } from './content-pages/pages/parametrage/utilisateur/utilisateur.module';
import { TaxeModule } from './content-pages/pages/parametrage/taxe/taxe.module';
import { FactureModule } from './content-pages/pages/parametrage/facture/facture.module';
import { LangueModule } from './content-pages/pages/parametrage/langue/langue.module';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])



@NgModule({
  declarations: [
    AppComponent,
      ContentPagesComponent,
   ],
  imports: [
    // NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    DeviseModule,
    UtilisateurModule,
    TaxeModule,
    FactureModule,
    LangueModule,
    TesteModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SingInModule,
    DemoNgZorroAntdModule
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
