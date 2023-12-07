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
