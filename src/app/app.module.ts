import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Applist } from './list.component';
import { AppList2 } from './list2.component';
import { AppList3 } from './list3.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { appService } from 'src/app/app.service';
import { FormsModule }   from '@angular/forms';
import { Form } from './form.component';


const appRoutes: Routes = [
  { path: 'list', component: Applist },
  { path: 'list2', component: AppList2 },
  { path: 'list3', component:  AppList3},
  { path:'form', component: Form}
];

@NgModule({
  declarations: [
    AppComponent,Applist,AppList2,AppList3,Form],
  imports: [
    BrowserModule ,RouterModule.forRoot(appRoutes),FormsModule,],
  providers: [appService],
  bootstrap: [AppComponent]
})
export class AppModule { }
