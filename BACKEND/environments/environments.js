module.exports = {
    messages: {
        global: {
            errors: {
                permission: "You don't have permission to perform this action",
                userInactive: "You don't have permission to perform this action, because your account is INACTIVE",
                userDeleted: "You don't have permission to perform this action, because your account was DELETED",
                roleInactive: "This function is disabled. If you have proper role you can activate it in roles module.",
                incorrectArrayElements: "Array of elements is incorrect"
            }
        },
        users: {
            errors: {
                email: "Please provide correct email address",
                firstName: "Please provide correct first name: it must contain only letters without spaces",
                lastName: "Please provide correct last name: it must contain only letters without spaces",
                password: "Please provide correct password: it must have at least 6 characters",
                emailExists: "User with specified email already exists",
                idNotFound: "User with specified id not found",
                emailNotFound: "User with specified email not found",
                wrongPassword: "Wrong password",
                inactive: "Can't login to inactive user",
                deleted: "Can't login to deleted user"
            },
            success: {
                created: "User successfully created",
                fetched: "User successfully fetched",
                updated: "User successfully updated",
                removed: "User successfully removed",
                loggedIn: "Successfully logged in",
                activated: "User successfully activated",
                deactivated: "User successfully deactivated"
            }
        },
        roles: {
            errors: {
                codeExists: "Role with specified code already exists",
                idNotFound: "Role with specified id not found",
            },
            success: {
                created: "Role successfully created",
                rolesFetched: "Roles successfully fetched",
                roleFetched: "Role successfully fetched",
                updated: "Role successfully updated",
                removed: "Role successfully removed",
                activated: "Role successfully activated",
                deactivated: "Role successfully deactivated"
            }
        },
        statistics: {
            success: {
                fetched: "Statistics successfully fetched"
            }
        },
        faqs: {
            errors: {
                codeLength: "Field Code must have at least 5 characters",
                codeRegexp: "Field Code contains wrong characters",
                nameLength: "Field Name must have at least 5 characters",
                nameRegexp: "Field Code contains wrong characters",
                idNotFound: "Faq with specified id not found",
            },
            success: {
                created: "Faq successfully created",
                fetched: "Faq successfully fetched",
                updated: "Faq successfully updated",
                removed: "Faq successfully removed",
                activated: "Faq successfully activated",
                deactivated: "Faq successfully deactivated"
            }
        },
        menus: {
            errors: {
                codeLength: "Field Code must have at least 5 characters",
                codeRegexp: "Field Code contains wrong characters",
                nameLength: "Field Name must have at least 5 characters",
                nameRegexp: "Field Code contains wrong characters",
                idNotFound: "Menu with specified id not found",
            },
            success: {
                created: "Menu successfully created",
                fetched: "Menu successfully fetched",
                updated: "Menu successfully updated",
                removed: "Menu successfully removed",
                activated: "Menu successfully activated",
                deactivated: "Menu successfully deactivated"
            }
        }
    },
    roles: {
        users: {
            getAll: "USERS/GET_ALL",
            getId: "USERS/GET_ID",
            create: "USERS/CREATE",
            update: "USERS/UPDATE",
            delete: "USERS/DELETE"
        },
        roles: {
            getAll: "ROLES/GET_ALL",
            getId: "ROLES/GET_ID",
            create: "ROLES/CREATE",
            update: "ROLES/UPDATE",
            delete: "ROLES/DELETE"
        }
    }
}