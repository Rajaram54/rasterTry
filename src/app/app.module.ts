import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { NgModule } from '@angular/core';
import { Applist } from './list.component';
import { AppList2 } from './list2.component';
import { AppList3 } from './list3.component';
import{ AppList4} from './list4.component';
import{ AppList5} from './list5.component';
import { AppComponent } from './app.component';
import { Param} from './params';
import { RouteParams} from './routeparams';
import { RouterModule, Routes} from '@angular/router';
import { appService } from 'src/app/app.service';
import { FormsModule }   from '@angular/forms';
import { Form } from './form.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{MatNativeDateModule}from '@angular/material';
import{MatFormFieldModule}from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { TreeModule } from 'angular-tree-component';

import * as $ from 'jquery';
import {MatInputModule,MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  

  MatButtonToggleModule,
  MatCardModule,

  MatChipsModule,

  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,} from '@angular/material';



const appRoutes: Routes = [
  { path: 'list', component: Applist },
  { path: 'list2', component: AppList2 },
  { path: 'list3', component:  AppList3},
  {path: 'list4',component: AppList4},
  {path: 'list5',component: AppList5},
  { path:'form', component: Form},
  {path:'getdata', component: Param},
  { path: 'params/:id', component:RouteParams }
];

@NgModule({
  declarations: [
    AppComponent,Applist,AppList2,AppList3,AppList4,AppList5,Form,Param,RouteParams],
  imports: [
   BrowserAnimationsModule,DragulaModule,TreeModule,
    BrowserModule ,RouterModule.forRoot(appRoutes),ReactiveFormsModule,FormsModule,HttpClientModule,MatTabsModule,MatCardModule,MatButtonModule,MatNativeDateModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatInputModule],
  providers: [appService,{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    DragulaModule,
    TreeModule

  ]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);