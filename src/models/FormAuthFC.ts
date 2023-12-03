import { AnyObject, StringSchema } from "yup"

export interface FormAuthFC {
    type: "register" | "login"
}

export interface FormAuthValidation {
    name?: StringSchema<string, AnyObject, undefined, "">
    surname?: StringSchema<string, AnyObject, undefined, "">
    email: StringSchema<string, AnyObject, undefined, "">
    password: StringSchema<string, AnyObject, undefined, "">
    repeatPassword?: StringSchema<string, AnyObject, undefined, "">
}