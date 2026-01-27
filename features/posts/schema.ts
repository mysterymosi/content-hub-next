import * as yup from "yup";

export const postSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  body: yup
    .string()
    .required("Body is required")
    .min(10, "Body must be at least 10 characters"),
  userId: yup
    .number()
    .required("User ID is required")
    .positive("User ID must be a positive number")
    .integer("User ID must be an integer"),
});

export type PostFormData = yup.InferType<typeof postSchema>;
