import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PhonePermutationSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { PhoneService, PhoneServerService } from '../services';
import { Ng2PaginationModule } from 'ng2-pagination';

@NgModule({
    imports: [
        PhonePermutationSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        ReactiveFormsModule,
        Ng2PaginationModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        PhoneService,
        PhoneServerService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhonePermutationHomeModule {}
