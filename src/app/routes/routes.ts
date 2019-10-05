import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AnnotationsPlayerComponent } from '../Annotations-player/Annotations-player.component';
import { UsersComponent } from '../users/users.component';
import { AssetsComponent } from '../assets/assets.component';
import { AuthGuard, SuperAuthGuard } from '../_guards';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { UploadAssetsComponent } from '../upload-assets/upload-assets.component';
export const ROUTES: Routes = [
    {
        path: 'Home',
        component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'Annotation',
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
        path: 'Configuration',
        component: ConfigurationComponent, canActivate : [SuperAuthGuard]
    },
    {
        path: 'uploadAsset',
        component: UploadAssetsComponent,
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
