import { Component, OnInit } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { FaqModel } from '../../shared/models/faq/Faq.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.css']
})
export class FaqDetailsComponent implements OnInit {

  faqId: string = undefined;
  faq: FaqModel = null;

  editFaqFormGroup: FormGroup;

  get control() {
    return this.editFaqFormGroup.controls;
  }

  matcher = new MyErrorStateMatcher();

  faqElementsVisibility = false;

  constructor(private faqService: FaqService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.getFaqById();
  }

  getFaqById(): void {
    this.faqId = this.activatedRoute.snapshot.paramMap.get('id');
    this.faqService.getFaqById(this.faqId).subscribe(
      res => {
        this.faq = res.data;
        this.editFaqFormGroup = new FormGroup({
          name: new FormControl(this.faq.name, [ Validators.required, Validators.minLength(5)]),
          description: new FormControl(this.faq.description)
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  clearChanges(): void {
    this.editFaqFormGroup.controls.name.setValue(this.faq.name);
    this.editFaqFormGroup.controls.description.setValue(this.faq.description);
  }

  changeStatus(): void {
    if (this.faq.status !== 'DELETED') {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '40%',
        data: {
          title: 'Change status',
          description: 'Are you sure you want to change status of this faq?',
          action: 'CHANGE_FAQ_STATUS',
          status: this.faq.status,
          _id: this.faqId,
          code: this.faq.code
        }
      });
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.getFaqById();
        }
      });
    }
  }

  removeFaq(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '40%',
      data: {
        title: 'Remove faq',
        description: 'Are you sure you want to remove this faq?',
        action: 'REMOVE_FAQ',
        status: 'DELETED',
        _id: this.faqId
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.router.navigate(['/faqs']);
      }
    });
  }

  addFaqElement(): void {
    console.log(this.faq.elements);
    this.faq.elements.push({
      question: 'question',
      answear: 'answear'
    });
  }

  removeFaqElement(index: number): void {
    this.faq.elements.splice(index, 1);
  }

  editFaq(): void {
    if (this.editFaqFormGroup.valid) {
      const faqData = this.prepareDataToSend();
      this.faqService.editFaq(this.faqId, faqData).subscribe(
        res => {
          this.snackBar.open(res.message, 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['success-snackbar']
          });
          this.faq = res.data;
        },
        err => {
          this.snackBar.open(err.error.message, 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }

  prepareDataToSend(): FaqModel{
    const faqData: FaqModel = this.editFaqFormGroup.value;
    if (!this.faq.elements.length) {
      faqData.elements = [];
    } else {
      faqData.elements = this.faq.elements;
    }
    return faqData;
  }

}
