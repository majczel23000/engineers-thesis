module.exports = {
    messages: {
        global: {
            errors: {
                permission: "You don't have permission to perform this action"
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
                wrongPassword: "Wrong password"
            },
            success: {
                created: "User successfully created",
                fetched: "User successfully fetched",
                updated: "User successfully updated",
                removed: "User successfully removed",
                loggedIn: "Successfully logged in"
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
            }
        }
    }
}