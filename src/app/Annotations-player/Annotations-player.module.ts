import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationsPlayerComponent } from './Annotations-player.component';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgControlsModule } from 'videogular2/controls';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        VgCoreModule,
        VgOverlayPlayModule,
        VgControlsModule,
        MatTableModule,
        MatSelectModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [ AnnotationsPlayerComponent ],
    exports: [AnnotationsPlayerComponent]
})
export class AnnotationsPlayerModule {
}
