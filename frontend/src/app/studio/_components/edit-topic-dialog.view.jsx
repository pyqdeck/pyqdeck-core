'use client';

import * as React from 'react';
import { BookOpen } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';

export function EditTopicDialogView({ form, onSubmit, open, onOpenChange }) {
  const {
    control,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border shadow-none sm:max-w-[450px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <BookOpen className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              Edit Learning Topic
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            Update the title or details of this specific learning point.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
          <FieldGroup>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Field data-invalid={!!errors.title}>
                  <FieldLabel className="font-roboto font-bold">
                    Topic Title
                  </FieldLabel>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="font-roboto border focus-visible:ring-0"
                        aria-invalid={!!errors.title}
                      />
                    )}
                  />
                  <FieldError errors={[errors.title]} />
                </Field>
              </div>

              <Field data-invalid={!!errors.order}>
                <FieldLabel className="font-roboto font-bold">Order</FieldLabel>
                <Controller
                  name="order"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      className="font-roboto border text-center focus-visible:ring-0"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      aria-invalid={!!errors.order}
                    />
                  )}
                />
                <FieldError errors={[errors.order]} />
              </Field>
            </div>

            <Field data-invalid={!!errors.description}>
              <FieldLabel className="font-roboto font-bold">
                Details (Optional)
              </FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="font-roboto min-h-[80px] resize-none border focus-visible:ring-0"
                    aria-invalid={!!errors.description}
                  />
                )}
              />
              <FieldError errors={[errors.description]} />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto bg-primary hover:bg-primary/90 h-11 w-full border font-bold shadow-none"
            >
              {isSubmitting ? 'Saving...' : 'Update Topic'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
