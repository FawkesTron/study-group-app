import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';
import { adminGuard } from './core/guards/admin-guard';
import { Posting } from './pages/posting/posting';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { 
        path: 'postings/new', 
        component: Posting,
        canActivate: [authGuard] 
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [adminGuard], // <- guard runs before Admin component is loaded
        data: { requiredRole: 'admin' }
    },
    { path: '**', redirectTo: '' }
];
