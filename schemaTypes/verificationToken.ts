import { defineField } from "sanity";

const verificationToken = {
    name: "verificationToken",
    type: "document",
    title: "Verification Token",
    fields: [
        defineField ({
            name: "identifier",
            title: "Identifier",
            type: "string",
        }),

        defineField ({
            name: "token",
            title: "Token",
            type: "string",
        }),

        defineField ({
            name: "expires",
            title: "Expires",
            type: "datetime",
        }),
    ],
};


export default verificationToken;