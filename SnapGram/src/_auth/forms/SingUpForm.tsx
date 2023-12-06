import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SingUpFormSchemaValidation } from "../../lib/validations/index";
import Loader from "../../components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SingUpForm = () => {
  const isLoading = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof SingUpFormSchemaValidation>>({
    resolver: zodResolver(SingUpFormSchemaValidation),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      phoneNumber: "",
      password: "",
      cpassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SingUpFormSchemaValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col h-auto mt-80">
        <img src="/assets/images/logo.svg" alt="Logo" />
        <h2 className="h3-bold md:h2-bold p-1 sm:p-3">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snpagram please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="shad-input" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input className="shad-input" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full shad-button_primary">
            {isLoading ? (
              <div className="flext-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sing up"
            )}
          </Button>
          <p className="text-small text-light-2 text-center mt-2">
            Already have a account?
            <Link
              to="/sing-in"
              className="text-primary-500 ml-1 text-small-semibold"
            >
              Sing in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SingUpForm;
