import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesteComponent } from './teste.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { RouterModule, Routes } from '@angular/router';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncoursComponent } from './composents/encours/encours.component';
import { MiseAJourComponent } from './composents/mise-a-jour/mise-a-jour.component';
import { RejeterComponent } from './composents/rejeter/rejeter.component';
import { ValiderComponent } from './composents/valider/valider.component';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

import {NgxPrintModule} from 'ngx-print';

const routes: Routes = [
  { path: '',
   component: TesteComponent
  },
];


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  imports: [
    NgxPrintModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DemoNgZorroAntdModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TesteComponent,EncoursComponent,MiseAJourComponent, RejeterComponent,ValiderComponent],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]

})
export class TesteModule { }
