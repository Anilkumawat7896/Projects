import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SingInFormSchemaValidation } from "../../lib/validations/index";
import Loader from "../../components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSingInAccountMutation } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SingInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: singInAccount } = useSingInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SingInFormSchemaValidation>>({
    resolver: zodResolver(SingInFormSchemaValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SingInFormSchemaValidation>) {
    const session = await singInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sing in failed please try again!" });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sing up failed.Please try again" });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col mt-40">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome , please enter your details
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

          <Button type="submit" className="w-full shad-button_primary">
            {isUserLoading ? (
              <div className="flext-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sing in"
            )}
          </Button>
          <p className="text-small text-light-2 text-center mt-2">
            New Here ?
            <Link
              to="/sing-up"
              className="text-primary-500 ml-1 text-small-semibold"
            >
              Sing up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SingInForm;
