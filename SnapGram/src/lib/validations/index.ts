import * as z from "zod";

export const SingUpFormSchemaValidation = z.object({
  email: z.string().email({ message: "Enter a Valid Email" }),
  fullName: z.string().min(5, { message: "Too short " }),
  username: z.string().min(2).max(50),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long and include a numeric value, uppercase, lowercase, and special character.",
      }
    ),
});
export const SingInFormSchemaValidation = z.object({
  email: z.string().email({ message: "Enter a Valid Email" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long and include a numeric value, uppercase, lowercase, and special character.",
      }
    ),
});

export const postValidations = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
