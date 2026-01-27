"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreatePostData } from "../types";
import { postSchema, type PostFormData } from "../schema";

interface PostFormProps {
  initialData?: Partial<CreatePostData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function PostForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = "Submit",
}: PostFormProps) {
  const form = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
      userId: 1,
    },
  });

  const onFormSubmit = async (data: PostFormData) => {
    // Note: userId is hardcoded to 1 for simplicity. In a production app, this would
    // typically come from the authenticated user's session or context.
    await onSubmit({ ...data, userId: 1 });
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="post-form-title">Title</FieldLabel>
              <Input
                {...field}
                id="post-form-title"
                aria-invalid={fieldState.invalid}
                placeholder="Enter post title"
                disabled={isLoading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="body"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="post-form-body">Body</FieldLabel>
              <Textarea
                {...field}
                id="post-form-body"
                aria-invalid={fieldState.invalid}
                placeholder="Enter post content"
                disabled={isLoading}
                rows={8}
                className="min-h-[80px]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Submitting..." : submitLabel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
