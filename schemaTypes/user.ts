import { defineField } from "sanity";

const user = {
    name: "user",
    title: "User",
    type: "document",
    fields: [
        defineField({
            name: "isAdmin",
            title: "Is Admin",
            type: "boolean",
            description: "check if the user is an admin",
            initialValue: false,
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "name",
            title: "Name",
            type: "string",
            description: "Name of the user",
            readOnly: true,
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),

        defineField({
            name: "emailVerified",
            type: "datetime",
            hidden: true,
        }),

        defineField({
            name: "image",
            title: "Image",
            type: "url",
        }),

        defineField({
            name: "password",
            type: "string",
            hidden: true,
        }),

        defineField({
            name: "about",
            title: "about",
            type: "text",
            description: "A brief description about the user",
        }),
    ],
};

export default user;