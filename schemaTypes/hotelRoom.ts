import { defineField } from "sanity";

const roomTypes = [
    {title: "Basic", value: "basic"},
    {title: "Luxury", value: "luxury"},
    {title: "Suite", value: "suite"},
];

const hotelRoom = {
    name: 'hotelRoom',
    title: "Hotel Room",
    type: "document",
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule =>
              Rule.required().max(50).error('Maximum 50 Characters'),
          }),

        defineField ({
            name: "slug",
            type: "slug",
            options: {
                source :'name',
            },
            validation: Rule => Rule.required(),
        }),

        defineField ({
            name: "description",
            title: "Description",
            type: "text",
            validation: Rule => 
                Rule.required().min(100).error("Minimum of 100 characters")
        }),

        defineField ({
            name: "price",
            title: "Price",
            type: "number",
            validation: Rule => 
                Rule.required().min(100).error("Maximum of 100 characters")
        }),

        defineField ({
            name: "discount",
            title: "Discount",
            type: "number",
            initialValue: 0,
            validation: Rule => Rule.min(0),
        }),

        defineField ({
            name: "images",
            title: "Images",
            type: "array",
            of: [{ 
                type: "object",
                fields: [{ 
                    name: "url",
                    type: "url",
                    title: "URL",
                 },
                 { 
                    name: "file",
                    type: "file",
                    title: "File",
                 },
                ]
             }],
             validation: 
                Rule => Rule.required().min(3).error("Minimum of 3 images required"),
        }),

        defineField ({
            name: "coverImage",
            title: "Cover Image",
            type: "object",
            fields: [{ 
                name: "url",
                type: "url",
                title: "URL",
             },
             { 
                name: "file",
                type: "file",
                title: "File",
             },
            ],
            validation: Rule => Rule.required().error("Cover image is required"),
        }),

        defineField ({
            name: "type",
            title: "Room Type",
            type: "string",
            options: {
                list: roomTypes,
            },
            validation: Rule => Rule.required(),
            initialValue: "basic",
        }),

        defineField ({
            name: "specialNote",
            title: "Special Note",
            type: "text",
            validation: Rule => Rule.required(),
            initialValue: 
                "Check-in time: 12:00PM, check-out time: 11:59AM. Incase of any forgoten items, contact the reception.",
        }),

        defineField ({
            name: "dimension",
            title: "Dimension",
            type: "string",
        }),

        defineField ({
            name: "numberofBeds",
            title: "Number of Beds",
            type: "number",
            validation: Rule => Rule.required().min(1),
            initialValue: 1,
        }),

        defineField ({
            name: "offeredAmenities",
            title: "Offered Amenities",
            type: "array",
            of: [{
                    type: "object",
                    fields: [{
                        name: "icon",
                        type: "string",
                        title: "Icon",
                        },
                        {
                            name: "amenity",
                            type: "string",
                            title: "Amenity",
                        },
                    ],
                }],
        }),

        defineField ({
            name: "isBooked",
            title: "Is Booked",
            type: "boolean",
            initialValue: false,   
        }),

        defineField ({
            name: "isFeatured",
            title: "Is Featured",
            type: "boolean",
            initialValue: false,   
        }),

        defineField ({
            name: "reviews",
            title: "Reviews",
            type: "array",
            of: [{ type: "review" }],   
        }),
    ],
};


export default hotelRoom;