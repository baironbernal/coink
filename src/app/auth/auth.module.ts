import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharacterComponent } from './character/character.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    DashboardComponent,
    CharacterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatTableModule
  ]
  
})
export class AuthModule { }
