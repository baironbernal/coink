import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharacterComponent } from './character/character.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    CharacterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
  
})
export class AuthModule { }
