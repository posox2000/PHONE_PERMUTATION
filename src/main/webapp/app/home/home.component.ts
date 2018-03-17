import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Account, LoginModalService, Principal } from '../shared';
import { PhoneService, PhoneServerService } from '../services'

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]
})

export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    generatedNumbers: string[];
    totalCount = 0;
    phoneForm: FormGroup;
    currentPage = 0;
    totalPages = 0;
    isGenerated= false;
    engineMethod: String = 'browser';

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private fb: FormBuilder,
        private phoneService: PhoneService,
        private phoneServerService: PhoneServerService
    ) {
            this.createForm();
    }

    createForm() {
        this.phoneForm = this.fb.group( {
            phoneNum: [null, Validators.pattern],
            engine: 'browser'
        });
    }

    onGenerate() {
        if (!this.phoneForm.get('phoneNum').errors && !this.phoneForm.pristine) {
            this.currentPage = 1;
            switch ( this.engineMethod ) {
                case 'browser':
                    this.generatedNumbers = this.phoneService.getPage(this.phoneForm.get('phoneNum').value, 10, this.currentPage );
                    this.isGenerated = true;
                    break;
                case 'server':
                    this.phoneServerService.get(this.phoneForm.get('phoneNum').value, 10, this.currentPage).subscribe(
                        (data) => {
                          this.generatedNumbers = data;
                        });
                    this.isGenerated = true;
            }
            this.totalPages = Math.ceil(this.totalCount / 10);
        }
    }

    onNextPage(page: number) {
        this.currentPage = page;
        switch ( this.engineMethod ) {
            case 'browser':
                this.generatedNumbers = this.phoneService.getPage(this.phoneForm.get('phoneNum').value, 10, page );
                break;
            case 'server':
                this.phoneServerService.get(this.phoneForm.get('phoneNum').value, 10, page).subscribe(
                    (data) => {
                      this.generatedNumbers = data;
                    });
                break;
        }
    }

    get phoneNum() {
        return this.phoneForm.get('phoneNum');
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.generatedNumbers = [];
        this.onChanges();
    }

    onChanges(): void {
        this.phoneForm.get('phoneNum').valueChanges.subscribe((val) => {
            this.totalCount = (!this.phoneForm.get('phoneNum').errors
                               && this.phoneForm.get('phoneNum').value !== ''
                               && !this.phoneForm.pristine) ? this.phoneService.getCount(this.phoneForm.get('phoneNum').value) : 0;
            this.totalPages = Math.ceil(this.totalCount / 10);
            this.generatedNumbers = [];
            this.isGenerated = false;
        });
        this.phoneForm.get('engine').valueChanges.subscribe((val) => {
            this.engineMethod = val;
        });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
