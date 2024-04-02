import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orderEdit',
  templateUrl: './orderEdit.component.html',
  styleUrls: ['./orderEdit.component.css']
})
export class OrderEditComponent implements OnInit {
  @Input() data: any | null = null;
  @Output() orderUpdate: EventEmitter<void> = new EventEmitter<void>();
  editorderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.editorderForm = this.fb.group({
      orderId: [{ value: '', disabled: true }, Validators.required],
      userName: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subtotal: ['', Validators.required],
      total: ['', Validators.required],
      delivery_status: ['', Validators.required], // Updated form control name
      payment_status: ['', Validators.required]   // Updated form control name
    });
  }

  ngOnInit() {
    this.patchFormWithData();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.patchFormWithData();
    }
  }

  onSubmit(): void {
    if (this.editorderForm.valid) {
      const formData = this.editorderForm.value;
      console.log("id:" + this.data._id)
      console.log("formdata:" + formData)

      // Assuming you have an order service with a method like editOrder
      this.orderService.editOrder(this.data._id, formData).subscribe(
        (response) => {
          console.log(response)
          this.toast.success('Order updated successfully');
          this.router.navigateByUrl('/orders')
          this.orderUpdate.emit();
          // Additional logic as needed, such as navigating to another page
        },
        (error: any) => {
          console.error('Error updating order:', error);
          this.toast.error('Failed to update order');
        }
      );
    }
  }

  private patchFormWithData() {
    if (this.data) {
      this.editorderForm.patchValue({
        orderId: this.data._id,
        userName: this.data.userName,
        country: this.data.shipping.address.country,
        email: this.data.shipping.email,
        phone: this.data.shipping.phone,
        subtotal: this.data.subtotal,
        total: this.data.total,
        delivery_status: this.data.delivery_status, // Updated form control name
        payment_status: this.data.payment_status   // Updated form control name
      });
    }
  }
}
