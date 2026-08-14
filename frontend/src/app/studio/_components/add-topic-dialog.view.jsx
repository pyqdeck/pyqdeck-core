'use client';

import * as React from 'react';
import { Plus, BookOpen, FileText, ListOrdered } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const labelClass =
  'font-roboto flex items-center gap-2 text-xs font-bold tracking-wider uppercase';

export function AddTopicDialogView({
  form,
  onSubmit,
  open,
  onOpenChange,
  trigger = true,
  moduleName,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="font-roboto hover:bg-primary/10 hover:text-primary h-7 border px-2 text-[10px] font-bold tracking-widest uppercase transition-colors"
          >
            <Plus className="mr-1 h-3 w-3" /> Add Topic
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="border shadow-none sm:max-w-[480px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <BookOpen className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              Add Learning Topic
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            {moduleName
              ? `Adding to: ${moduleName}`
              : 'Specify a new learning point for this unit.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FieldGroup>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <Field data-invalid={!!errors.title}>
                  <FieldLabel className={labelClass}>
                    <FileText className="h-3.5 w-3.5" /> Topic Title
                  </FieldLabel>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="e.g. Backpropagation Algorithm"
                        className="font-roboto border"
                        aria-invalid={!!errors.title}
                      />
                    )}
                  />
                  <FieldError errors={[errors.title]} />
                </Field>
              </div>

              <div className="col-span-1">
                <Field data-invalid={!!errors.order}>
                  <FieldLabel className={labelClass}>
                    <ListOrdered className="h-3.5 w-3.5" /> Order
                  </FieldLabel>
                  <Controller
                    name="order"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        className="font-roboto border text-center"
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
            </div>

            <Field data-invalid={!!errors.description}>
              <FieldLabel className={labelClass}>Details (Optional)</FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Brief overview of the topic contents..."
                    className="font-roboto min-h-[100px] resize-none border"
                    aria-invalid={!!errors.description}
                  />
                )}
              />
              <FieldError errors={[errors.description]} />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto w-full border font-bold shadow-none"
            >
              {isSubmitting ? (
                'Registering topic…'
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Register learning topic
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
