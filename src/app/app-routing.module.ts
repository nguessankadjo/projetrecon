import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentPagesComponent } from './content-pages/content-pages.component';
import { SingInComponent } from './singIn/singIn.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  {
    path: '',
    component:SingInComponent,
    children:[
      {
        path: '',
        redirectTo: 'authenticate',
        pathMatch: 'full'
      },
      {
        path: 'authenticate',
        loadChildren: () => import('./singIn/singIn.module').then(module => module.SingInModule)
      },
    ]
  },
  {
    path: '',
    component:ContentPagesComponent,
    children:[
      {
        path: '',
        redirectTo: 'tableau-de-bord',
        pathMatch: 'full'
      },
      {
        path: 'tableau-de-bord',
        loadChildren: () => import('./content-pages/pages/editer/editer.module').then(module => module.EditerModule),
      },
      {
        path: 'edition',
        loadChildren: () => import('./teste/teste.module').then(module => module.TesteModule),
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./content-pages/pages/parametrage/utilisateur/utilisateur.module').then(module => module.UtilisateurModule),
      },
      {
        path: 'devise',
        loadChildren: () => import('./content-pages/pages/parametrage/devise/devise.module').then(module => module.DeviseModule),
      },
      {
        path: 'filiale',
        loadChildren: () => import('./content-pages/pages/parametrage/filiale/filiale.module').then(module => module.FilialeModule),
      },
      {
        path: 'taxe',
        loadChildren: () => import('./content-pages/pages/parametrage/taxe/taxe.module').then(module => module.TaxeModule),
      },
      {
        path: 'langue',
        loadChildren: () => import('./content-pages/pages/parametrage/langue/langue.module').then(module => module.LangueModule),
      },
      {
        path: 'facture',
        loadChildren: () => import('./content-pages/pages/parametrage/facture/facture.module').then(module => module.FactureModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
