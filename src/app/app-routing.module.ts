import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { globalRoutes } from './app-routes';

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(globalRoutes)],
})
export class AppRoutingModule {}
