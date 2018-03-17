import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { PhonePermutationSharedModule, UserRouteAccessService } from './shared';
import { PhonePermutationAppRoutingModule} from './app-routing.module';
import { PhonePermutationHomeModule } from './home/home.module';
import { PhonePermutationAdminModule } from './admin/admin.module';
import { PhonePermutationAccountModule } from './account/account.module';
import { PhonePermutationEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        PhonePermutationAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        PhonePermutationSharedModule,
        PhonePermutationHomeModule,
        PhonePermutationAdminModule,
        PhonePermutationAccountModule,
        PhonePermutationEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class PhonePermutationAppModule {}
