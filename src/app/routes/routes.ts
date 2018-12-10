import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AnnotationsPlayerComponent } from '../Annotations-player/Annotations-player.component';
import { UsersComponent } from '../users/users.component';
import { AssetsComponent } from '../assets/assets.component';
import { AuthGuard } from '../_guards';

export const ROUTES: Routes = [
    {
        path: 'Home',
        component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'Player',
        component: AnnotationsPlayerComponent, canActivate: [AuthGuard]
    },
    {
        path: 'Users',
        component: UsersComponent
    },
    {
        path: 'Assets',
        component: AssetsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: '/Home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/Home',
        pathMatch: 'full'
    }
];
