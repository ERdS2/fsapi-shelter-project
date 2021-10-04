import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdoptComponent } from './components/adopt/adopt.component';
import { RegisterComponent } from './components/register/register.component';
import { DogsComponent } from './components/dogs/dogs.component'
import { CatsComponent } from './components/cats/cats.component';
import { UploadComponent } from './components/upload/upload.component';
import { LandingPageComponent } from './components/landingPage/landingPage.component';
import { AdminRoleGuardService } from './service/admin-role-guard.service';
import { AuthGuardGuard } from './service/auth-guard.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "adopt",
   component: AdoptComponent,
    canActivate: [AuthGuardGuard]
  },
  {path: "dogs", component: DogsComponent},
  {path: "cats", component: CatsComponent},
  {path: "register", component: RegisterComponent},
  {path: "upload",
    component: UploadComponent,
    canActivate: [AdminRoleGuardService]
  },
  {path: "landingPage", component: LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
