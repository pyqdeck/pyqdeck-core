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
      <DialogContent className="overflow-hidden border bg-white p-0 shadow-sm sm:max-w-[480px] dark:bg-zinc-950">
        <DialogHeader className="bg-primary/5 dark:bg-primary/10 border-b px-6 pt-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="font-roboto text-2xl font-black">
                Add Learning Topic
              </DialogTitle>
              <DialogDescription className="font-roboto text-muted-foreground text-sm font-medium">
                {moduleName
                  ? `Adding to: ${moduleName}`
                  : 'Specify a new learning point for this unit.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 bg-slate-50/50 p-6 dark:bg-zinc-900/20">
            <FieldGroup>
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3">
                  <Field data-invalid={!!errors.title}>
                    <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                      <FileText className="h-3.5 w-3.5" /> Topic Title
                    </FieldLabel>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="e.g. Backpropagation Algorithm"
                          className="font-roboto focus-visible:border-primary focus-visible:ring-primary/20 h-12 border bg-white text-base font-semibold shadow-sm dark:bg-zinc-900"
                          aria-invalid={!!errors.title}
                        />
                      )}
                    />
                    <FieldError errors={[errors.title]} />
                  </Field>
                </div>

                <div className="col-span-1">
                  <Field data-invalid={!!errors.order}>
                    <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                      <ListOrdered className="h-3.5 w-3.5" /> Order
                    </FieldLabel>
                    <Controller
                      name="order"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          className="font-roboto focus-visible:border-success focus-visible:ring-success/20 h-12 border bg-white text-center text-lg font-bold shadow-sm dark:bg-zinc-900"
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
                <FieldLabel className="font-roboto text-muted-foreground mb-1.5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                  Details (Optional)
                </FieldLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Brief overview of the topic contents..."
                      className="font-roboto focus-visible:border-success focus-visible:ring-success/20 min-h-[100px] resize-none border bg-white text-sm shadow-sm dark:bg-zinc-900"
                      aria-invalid={!!errors.description}
                    />
                  )}
                />
                <FieldError errors={[errors.description]} />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="bg-muted/20 border-t px-6 py-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto bg-success hover:bg-success/90 h-12 w-full border text-base font-bold text-white shadow-none"
            >
              {isSubmitting ? (
                'Registering topic…'
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" /> Register learning topic
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
