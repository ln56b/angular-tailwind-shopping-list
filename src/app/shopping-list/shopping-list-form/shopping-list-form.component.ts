import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingList } from 'src/app/models/ShoppingList.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.component.html',
  styleUrls: ['./shopping-list-form.component.scss'],
})
export class ShoppingListFormComponent implements OnInit {
  faBack = faLongArrowAltLeft;

  formGroup: FormGroup;
  id: string;
  list: ShoppingList;
  isUpdate: boolean;

  constructor(
    private fb: FormBuilder,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getTitle(): string {
    return this.id ? 'Update list' : 'Add list';
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.isUpdate = false;
      this.initForm();
    } else {
      this.isUpdate = true;
      this.shoppingListService.getListWithItems(this.id).subscribe((list) => {
        this.list = list;
        this.initForm(list);
      });
    }
  }

  onSubmit(): void {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.valid) {
      this.shoppingListService.save(this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['/', 'lists']);
        },
        error: () => {
          console.log('There has been an error');
        },
      });
    }
  }

  protected initForm(
    list: ShoppingList = {
      _id: undefined,
      name: undefined,
      client: undefined,
      total: undefined,
      createdAt: undefined,
      isMarkedOut: false,
      items: [],
    }
  ): void {
    this.formGroup = this.fb.group({
      _id: [list._id],
      name: [list.name, Validators.required],
      client: [list.client],
      total: [list.total],
      createdAt: [list.createdAt],
      isMarkedOut: [list.isMarkedOut],
      items: [],
    });
  }

  protected validateFormGroup(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if ((control as FormGroup).controls) {
        this.validateFormGroup(control as FormGroup);
      } else {
        control.markAsDirty({ onlySelf: true });
      }
    });
    formGroup.updateValueAndValidity({ onlySelf: true });
  }
}
