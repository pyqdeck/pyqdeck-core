'use client';

import * as React from 'react';
import {
  Plus,
  Layers,
  Hash,
  BookOpen,
  Percent,
  ClipboardList,
} from 'lucide-react';
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

export function AddModuleDialogView({
  form,
  onSubmit,
  open,
  onOpenChange,
  trigger = true,
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
            size="sm"
            className="font-roboto border font-bold shadow-none"
          >
            <Plus className="h-4 w-4" /> Add Module
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="border shadow-none sm:max-w-[550px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Layers className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              New Curriculum Module
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            Define a new unit and its learning objectives.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.moduleNumber}>
                <FieldLabel className={labelClass}>
                  <Hash className="h-3.5 w-3.5" /> Module Number
                </FieldLabel>
                <Controller
                  name="moduleNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      className="font-roboto border"
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
                <FieldLabel className={labelClass}>
                  <Percent className="h-3.5 w-3.5" /> Exam Weightage
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
                      className="font-roboto border"
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
              <FieldLabel className={labelClass}>
                <BookOpen className="h-3.5 w-3.5" /> Module Title
              </FieldLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="e.g. Introduction to Neural Networks"
                    className="font-roboto border"
                    aria-invalid={!!errors.title}
                  />
                )}
              />
              <FieldError errors={[errors.title]} />
            </Field>

            <Field data-invalid={!!errors.coMapping}>
              <FieldLabel className={labelClass}>
                <ClipboardList className="h-3.5 w-3.5" /> CO Mapping
              </FieldLabel>
              <Controller
                name="coMapping"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="e.g. CO1, CO2"
                    className="font-roboto border"
                    aria-invalid={!!errors.coMapping}
                  />
                )}
              />
              <FieldDescription className="text-xs">
                Map this unit to specific Course Outcomes.
              </FieldDescription>
              <FieldError errors={[errors.coMapping]} />
            </Field>

            <Field data-invalid={!!errors.description}>
              <FieldLabel className={labelClass}>
                Learning Objectives
              </FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Detail the scope and objectives of this module..."
                    className="font-roboto min-h-[120px] resize-none border"
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
                'Creating module…'
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add module to curriculum
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
