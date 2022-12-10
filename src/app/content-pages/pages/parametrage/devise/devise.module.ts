import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviseComponent } from './devise.component';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { RouterModule, Routes } from '@angular/router';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '',
   component: DeviseComponent
  },
];


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DemoNgZorroAntdModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DeviseComponent],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})
export class DeviseModule { }
