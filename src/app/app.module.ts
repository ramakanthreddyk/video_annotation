import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes/routes';
import { AnnotationsPlayerModule } from './Annotations-player/Annotations-player.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTabsModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard, SuperAuthGuard } from './_guards';
import { AuthenticationService, UserService, AnnotationService } from './_services';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { AssetsComponent } from './assets/assets.component';
import { EditAnnotationComponent } from './edit-annotation/edit-annotation.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        SidebarComponent,
        UsersComponent,
        AssetsComponent,
        EditAnnotationComponent,
        ConfigurationComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES, { useHash: true }),
        ReactiveFormsModule,
        HttpClientModule,
        AnnotationsPlayerModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatDialogModule,
        FormsModule,
        FlexLayoutModule,
        MatSelectModule,
        MatTabsModule
    ],
    providers: [
        AuthGuard,
        SuperAuthGuard,
        AuthenticationService,
        UserService,
        AnnotationService
    ],
    entryComponents: [EditAnnotationComponent],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
