import * as z from "zod";

export const studentFormSchema = z.object({
  name: z
    .string({ required_error: "Student name is required." })
    .min(2, { message: "Name must be at least 2 characters." }),
  class: z.string().min(1, { message: "Student class is required." }),
  address: z
    .string()
    .min(3, { message: "Address should be at least 3 characters" }),
  gender: z.enum("male, female"),
  displayImage: z.any(),
  dob: z.date({ required_error: "A date of birth is required." }),
  parentName: z
    .string({ required_error: "Parent name is required." })
    .min(2, { message: "Name must be at least 2 characters." }),
  parentEmail: z
    .string()
    .email({ message: "Invalid email address." })
    .nullable(false, { required_error: "Parent Email is required." }),
  parentOccupation: z.string({
    required_error: "Parent Occupation is required.",
  }),
  parentGender: z.enum("male, female"),
  phone: z
    .string({ required_error: "Phone number is required." })
    .length(10, { message: "Name must be at least 2 characters." }),
});
