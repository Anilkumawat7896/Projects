import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { postValidations } from "@/lib/validations";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type postFormProps = {
  post?: Models.Document;
};
function PostForm({ post }: postFormProps) {

  // ? be aware it is nopt resolved yet
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { user } = useUserContext();
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof postValidations>>({
    resolver: zodResolver(postValidations),
    defaultValues: {
      caption: post ? post.caption : " ",
      file: [],
      location: post ? post.location : " ",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof postValidations>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });
    if (!newPost) {
      toast({ title: "Please try again" });
    }
    navigate("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (saparated by a comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Art,Science,Travel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancle
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
