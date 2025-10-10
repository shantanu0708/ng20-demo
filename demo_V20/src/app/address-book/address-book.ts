import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-address-book',
    imports: [ReactiveFormsModule, TranslatePipe, NgClass],
    templateUrl: './address-book.html',
    styleUrl: './address-book.css'
})
export class AddressBook {

    public form: FormGroup;
    public headings: any[] = ['TABLE_SR_NO', 'TABLE_NAME', 'TABLE_EMAIL', 'TABLE_PHONES', 'TABLE_ADDRESS', 'TABLE_ACTIONS'];
    public recordData: any[] = [];
    public counter: number = 0;

    constructor(private fb: FormBuilder, private translate: TranslateService) {
        this.form = this.fb.group({
            id: [0],
            fname: ['', Validators.required],
            email: ['', [Validators.required,Validators.email]],
            phones: ['', Validators.required],
            addr: ['']
        });
    }

    addRecord() {
        if(this.form.invalid) {
            this.form.markAllAsTouched();
            alert('Form contains validation issues, kindly provide the mandatory fields.');
        }
        if (this.recordData.length == 0) {
            this.counter = 0;
        }
        this.form.value.id = this.counter++;

        this.recordData.push({ ...this.form.value });
        console.log(this.recordData);
    }

    deleteRecord(dt: any) {
        this.recordData = this.recordData.filter((item: any) => item.id !== dt.id);
    }

    editRecord(dt: any) {
        this.form.setValue(dt);
    }
    updateRecord(dt: any) {
        var index = this.recordData.findIndex((i: any) => i.id == dt.value.id);
        this.recordData.splice(index, 1, dt.value);
    }
}
