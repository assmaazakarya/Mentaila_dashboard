import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users/users.component';
import { CoachComponent } from './components/coach/coach.component';
import { MealsComponent } from './components/meals/meals.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MealFormComponent } from './components/mealForm/mealForm.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { OrderEditComponent } from './components/orderEdit/orderEdit.component';
import { AuthGuard } from './components/services/auth.guard';
import { AddMealComponent } from './components/Add-meal/Add-meal.component';
import { AddCoachComponent } from './components/AddCoach/AddCoach.component';
import { EditCoachComponent } from './components/editCoach/editCoach.component';

const routes: Routes = [
  {path:'',redirectTo:'main',pathMatch:'full'},
  {
    path: 'home' , canActivate:[AuthGuard] ,
    component: HomeComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'users', component: UsersComponent },
      { path: 'coaches', component: CoachComponent },
      { path: 'meals', component: MealsComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
  { path: 'main', canActivate:[AuthGuard] ,component: MainComponent },
  { path: 'users', canActivate:[AuthGuard] ,component: UsersComponent ,
  children: [
    {path: 'edituser' , component: EditUserComponent}
  ]
},
  { path: 'coaches', canActivate:[AuthGuard] , component: CoachComponent ,
  children:[
    {path:"editcoach" , component: EditCoachComponent}
  ]
},
  { path: 'meals', canActivate:[AuthGuard] , component: MealsComponent, 
  children: [
    { path: 'mealform', component: MealFormComponent },
  ] },
  { path: 'orders', canActivate:[AuthGuard] , component: OrdersComponent ,
  children: [
    { path:'editorder' , component : OrderEditComponent }
  ]
},
  { path: 'login', component: LoginComponent },
  { path: 'register', canActivate:[AuthGuard] , component: RegisterComponent },
  { path: 'mealform', canActivate:[AuthGuard] , component: MealFormComponent },
  { path: 'edituser', canActivate:[AuthGuard] , component: EditUserComponent },
  { path: 'editorder', canActivate:[AuthGuard] ,component: OrderEditComponent },
  { path: 'addmeal', canActivate:[AuthGuard] ,component: AddMealComponent },
  { path: 'addcoach', canActivate:[AuthGuard] ,component: AddCoachComponent },
  { path: 'editcoach', canActivate:[AuthGuard] ,component: EditCoachComponent },

  { path: '**', canActivate:[AuthGuard] , component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
