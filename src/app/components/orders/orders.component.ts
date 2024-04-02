import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../DataTypes/order';
import { OrderService } from '../services/order.service';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  order!: any;

  constructor(
    private orderService: OrderService,
    private userService: UsersService,
    private toast : ToastrService

  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(
      (response: any) => {
        this.orders = response;
        this.fetchUserNames();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  delete(id: any) {
    this.orderService.deleteOrder(id).subscribe({
      next: (response) => {
        this.toast.warning("order Deleted successfully");
        this.getAllOrders();
      },
      error: (error) => {
        console.error("An error occurred while deleting:", error);
      }
    });
  }

  fetchUserNames() {
    this.orders.forEach((order, index) => {
      console.log(order.userId)
      this.userService.getUser(order.userId).subscribe(
        (response) => {
          // console.log(response); // Log the entire response object
          if (Array.isArray(response) && response.length > 0) {
            const user = response[0]; // Access the first element of the array
            this.orders[index].userName = user.name; // Ensure 'name' property exists in the response
            // console.log(user.name);
          } else {
            console.error('User data not found in the response');
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
      
    });
  }

  loadOrder(data : any){
    this.order = data;
  }

  getBadgeClass(status: any): Object {
    switch (status) {
      case 'delivered':
        return { 'bg-success': true };
      case 'in_transit':
        return { 'changPrimary': true };
      case 'pending':
        return { 'pinkBg': true }; // Use the original color for pending
      case 'paid':
        return { 'bg-secondary': true };
      case 'unpaid':
        return { 'pinkBg': true };
      default:
        return {}; // Return empty object for unknown states
    }
  }

}
