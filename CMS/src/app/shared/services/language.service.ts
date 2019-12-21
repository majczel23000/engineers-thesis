import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  data = {
    "en": {
        appName: "Content Mangement System",
        Dashboard: "Dashboard",
        Users: "Users",
        Roles: "Roles",
        Faqs: "Faqs",
        Menus: "Menus",
        Pages: "Pages",
        Images: "Images",
        Settings: "Settings",
        Carousels: "Carousels",
        Dictionaries: "Dictionaries",
        welcomeTo: "Welcome to",
        welcomeText1: "powerfull tool for creating various elements",
        welcomeText2: "Here are modules that you have access to (specific actions depends on your roles):",
        UsersListNav: "Users list",
        UsersAddNav: "Add new user",
        location: "Location",
        locationUsers: "users",
        locationRegister: 'register',
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        status: "Status",
        password: 'Password',
        userItemsPerPage: "Users per page",
        filter: "Filter",
        newUserHeader: "Add new user",
        newUserEmailPlaceholder: "Type your email here",
        newUserFirstNamePlaceholder: "Type your first name here",
        newUserLastNamePlaceholder: "Type your lat name here",
        newUserPasswordPlaceholder: "Type your password here",
        selectRoles: "Select roles",
        register: "Register",
        user: "User",
        createdAt: "Created at",
        updatedAt: "Updated at",
        roles: "Roles",
        saveChanges: "Save changes",
        clearChanges: "Clear changes",
        removeUser: "Remove user"
    },
    "es":{
        appName: "Sistema de gestión de contenidos",
        Dashboard: "Tablero",
        Users: "Los usuarios",
        Roles: "Roles",
        Faqs: "Faqs",
        Menus: "Menús",
        Pages: "Páginas",
        Images: "Imágenes",
        Settings: "Configuraciones",
        Carousels: "Carruseles",
        Dictionaries: "Diccionarios",
        welcomeTo: "Bienvenido a",
        welcomeText1: "herramienta poderosa para crear varios elementos",
        welcomeText2: "Aquí hay módulos a los que tiene acceso (las acciones específicas dependen de sus roles):",
        UsersListNav: "Lista de usuarios",
        UsersAddNav: "Añadir nuevo usuario",
        location: "Ubicación",
        locationUsers: "los usuarios",
        locationRegister: 'registrarse',
        firstName: "Nombre de pila",
        lastName: "Apellido",
        email: "Email",
        status: "Estado",
        password: 'contraseña',
        userItemsPerPage: "Usuarios por página",
        filter: "Filtrar",
        newUserHeader: "Añadir nuevo usuario",
        newUserEmailPlaceholder: "Escriba su correo electrónico aquí",
        newUserFirstNamePlaceholder: "Escribe tu nombre aquí",
        newUserLastNamePlaceholder: "Escriba su nombre de lat aquí",
        newUserPasswordPlaceholder: "Escriba su contraseña aquí",
        selectRoles: "Seleccionar roles",
        register: "Registrarse",
        user: "Usuario",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        roles: "Roles",
        saveChanges: "Guardar cambios",
        clearChanges: "Cambios claros",
        removeUser: "Eliminar usuario"
      }
  }

  constructor() {
    if (!localStorage.getItem("languageCode")) {
      localStorage.setItem("languageCode", "en");
    }
   }

  getTranslation(code: string) {
    return this.data[localStorage.getItem("languageCode")][code];
  }

  changeLanguageCode(code: string) {
    localStorage.setItem("languageCode", code);
  }
}
