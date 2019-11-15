import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/superuser/create',
      name: 'admin',
      component: () => import('./views/superuser/CreateSuperUser.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/users/Users.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/users/new',
      name: 'new user',
      component: () => import('./views/users/NewUser.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/users/edit',
      name: 'edit user',
      component: () => import('./views/users/EditUser.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/user-groups',
      name: 'user groups',
      component: () => import('./views/user-groups/UserGroups.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/user-groups/new',
      name: 'new user group',
      component: () => import('./views/user-groups/NewUserGroup.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/user-groups/edit',
      name: 'edit user group',
      component: () => import('./views/user-groups/EditUserGroup.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/colors',
      name: 'colors',
      component: () => import('./views/colors/Colors.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/colors/new',
      name: 'new color',
      component: () => import('./views/colors/NewColor.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/colors/edit',
      name: 'edit color',
      component: () => import('./views/colors/EditColor.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('./views/categories/Categories.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/categories/new',
      name: 'new category',
      component: () => import('./views/categories/NewCategory.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/categories/edit',
      name: 'edit category',
      component: () => import('./views/categories/EditCategory.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/products/Products.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/products/new',
      name: 'new product',
      component: () => import('./views/products/NewProduct.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/products/edit',
      name: 'edit product',
      component: () => import('./views/products/EditProduct.vue'),
      beforeEnter: ifAuthenticated
    },

    {
      path: '/brands',
      name: 'brands',
      component: () => import('./views/brands/Brands.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/brands/new',
      name: 'new brand',
      component: () => import('./views/brands/NewBrand.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/brands/edit',
      name: 'edit brand',
      component: () => import('./views/brands/EditBrand.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
