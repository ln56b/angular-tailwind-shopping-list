import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/Item.model';
import { ItemService } from 'src/app/services/item.service';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  faBack = faLongArrowAltLeft;

  formGroup: FormGroup;
  itemId: string;
  item: Item;
  listId: string;
  isUpdate: boolean;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getTitle(): string {
    return this.itemId ? 'Modifier le produit' : 'Ajouter un produit';
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.listId = this.route.snapshot.url[1].path;
    if (!this.itemId) {
      this.isUpdate = false;
      this.initForm();
    } else {
      this.itemService
        .getItemFromList(this.listId, this.itemId)
        .subscribe((item) => {
          this.item = item;
          this.initForm(item);
        });
    }
  }

  onSubmit(): void {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.valid) {
      this.itemService.save(this.listId, this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['/', 'lists', this.listId, 'items']);
        },
        error: () => {
          console.log('There has been an error');
        },
      });
    }
  }

  protected initForm(
    item: Item = {
      _id: undefined,
      name: undefined,
      price: undefined,
      quantity: undefined,
      unit: undefined,
      isMarkedOut: false,
    }
  ): void {
    this.formGroup = this.fb.group({
      _id: [item._id],
      name: [item.name, Validators.required],
      price: [item.price],
      quantity: [item.quantity],
      unit: [item.unit],
      isMarkedOut: [item.isMarkedOut],
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
