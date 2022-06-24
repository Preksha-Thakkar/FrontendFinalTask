import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-invoices',
  templateUrl: './create-invoices.component.html',
  styleUrls: ['./create-invoices.component.css']
})
export class CreateInvoicesComponent implements OnInit {

  validateForm!: FormGroup;
  selectedInvoiceDate: any;
  listOfItems: any[] = [];
  taxes= [0,10,15,20]
  uniqueTaxToShow:any[] = []
  i = 0;
  items: FormArray | undefined;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      invoiceDate: ['', [Validators.required]],
      dueDate: ['', [this.dueDateValidations]],
      invoiceId: ['', [Validators.required]],
      reference: [''],
      currency: ['', [Validators.required]],
      items: this._fb.array([]),
    })
    this.addRow();
  }

  //match password and confirm password
  validateDueDate(event: any): void {
    this.selectedInvoiceDate = event
    setTimeout(() => this.validateForm.controls['invoiceDate'].updateValueAndValidity());
  }

  //closed date validations
  dueDateValidations = (control: FormControl): { [s: string]: boolean } => {
    if (control.value != null) {
      if (control.value < this.selectedInvoiceDate) {
        return { confirm: true, error: true };
      }
    }
    return {};
  };

  //save invoice data to db
  submitForm() {
    console.log(this.validateForm)
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.uniqueTaxToShow = [];
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        console.log(control)
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

    }
  }

  //create new field
  createItem(unitHrsId?: number): FormGroup {
    return this._fb.group({
      id: this.i++,
      itemDesc: ['', [Validators.required]],
      itemQty: [null, [Validators.required]],
      unitPrice: [null, [Validators.required]],
      account: [null, [Validators.required]],
      disc: [null],
      taxRate: [null, [Validators.required]],
    });
  }
  //add new item
  addRow(): void {
    this.items = this.validateForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  //delete row of item
  deleteRow(id: any, item: any): void {
    if (this.itemsFormArray.controls > 1) {
      this.listOfItems = this.listOfItems.filter(d => d.id !== id);
    }
  }

  //get items as formarray
  get itemsFormArray(): any {
    return this.validateForm.get('items') as FormArray;
  }

  //get subtotal of all items
  getSubtotal(){
    var subtotal = 0;
    this.itemsFormArray.controls.forEach((element:any) => {
      subtotal += (element['controls'].itemQty.value * element['controls'].unitPrice.value)-((element['controls'].itemQty.value*element['controls'].unitPrice.value)/(element['controls'].disc.value))
    });
    return subtotal || 0
  }
  //get total VAT
  getVAT(){
    return 0
  }
  //get total
  getTotal(){
    return 0
  }

}
