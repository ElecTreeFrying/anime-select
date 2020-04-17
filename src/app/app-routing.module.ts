import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
   loadChildren: () => import('./select/select.module').then(m => m.SelectModule) 
  }, { 
    path: 'characters', 
    loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule) 
  }, { 
    path: 'search', 
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule) 
  }, { 
    path: 'about', 
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) 
  }, { 
    path: 'contact', 
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) 
  }, { 
    path: 'report-issue', 
    loadChildren: () => import('./report-issue/report-issue.module').then(m => m.ReportIssueModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
