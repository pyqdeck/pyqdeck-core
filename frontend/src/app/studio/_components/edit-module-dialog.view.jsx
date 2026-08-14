'use client';

import * as React from 'react';
import { Layers } from 'lucide-react';
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
  FieldDescription,
  FieldError,
} from '@/components/ui/field';

export function EditModuleDialogView({ form, onSubmit, open, onOpenChange }) {
  const {
    control,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border pb-0 shadow-none sm:max-w-[500px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Layers className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              Edit Module Details
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            Modify the properties and objectives of this curriculum unit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.moduleNumber}>
                <FieldLabel className="font-roboto font-bold">
                  Module Number
                </FieldLabel>
                <Controller
                  name="moduleNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      className="font-roboto border focus-visible:ring-0"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      aria-invalid={!!errors.moduleNumber}
                    />
                  )}
                />
                <FieldError errors={[errors.moduleNumber]} />
              </Field>

              <Field data-invalid={!!errors.weightage}>
                <FieldLabel className="font-roboto font-bold">
                  Exam Weightage (%)
                </FieldLabel>
                <Controller
                  name="weightage"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      max="100"
                      className="font-roboto border focus-visible:ring-0"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      aria-invalid={!!errors.weightage}
                    />
                  )}
                />
                <FieldError errors={[errors.weightage]} />
              </Field>
            </div>

            <Field data-invalid={!!errors.title}>
              <FieldLabel className="font-roboto font-bold">
                Module Title
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

            <Field data-invalid={!!errors.coMapping}>
              <FieldLabel className="font-roboto font-bold">
                CO Mapping
              </FieldLabel>
              <Controller
                name="coMapping"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="font-roboto border focus-visible:ring-0"
                    aria-invalid={!!errors.coMapping}
                  />
                )}
              />
              <FieldError errors={[errors.coMapping]} />
            </Field>

            <Field data-invalid={!!errors.description}>
              <FieldLabel className="font-roboto font-bold">
                Learning Objectives
              </FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="font-roboto min-h-[100px] resize-none border focus-visible:ring-0"
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
              {isSubmitting ? 'Saving...' : 'Update Module'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
