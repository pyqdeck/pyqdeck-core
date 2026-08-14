'use client';

import * as React from 'react';
import { Plus, GraduationCap, Building, BookOpen, Layers } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddOfferingDialogView({
  university,
  branch,
  semester,
  subjects = [],
  form,
  onSubmit,
  open,
  onOpenChange,
  trigger = true,
}) {
  'use no memo';
  const {
    control,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  const contextLabel = [
    university?.shortName || university?.name,
    branch?.shortName || branch?.name,
    semester ? `Semester ${semester.number}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          <Button className="font-roboto bg-primary hover:bg-primary/90 border font-bold shadow-none">
            <Plus className="h-4 w-4" /> New Offering
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
              Deploy Subject Offering
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            Map a subject to this semester.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {contextLabel && (
            <div className="bg-muted/40 text-muted-foreground font-roboto rounded-md border px-3 py-2 text-sm">
              Adding to{' '}
              <span className="text-foreground font-bold">{contextLabel}</span>
            </div>
          )}

          <div className="grid gap-2">
            <Label
              htmlFor="subjectId"
              className="font-roboto text-xs font-bold tracking-wider uppercase"
            >
              Subject
            </Label>
            <Controller
              name="subjectId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="font-roboto w-full border focus:ring-0">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent className="border shadow-none">
                    {subjects.map((sub) => (
                      <SelectItem
                        key={sub.id}
                        value={sub.id}
                        className="font-roboto"
                      >
                        {sub.name} ({sub.subjectCode || 'N/A'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subjectId && (
              <p className="font-roboto text-destructive text-xs font-bold">
                {errors.subjectId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="regulation"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Regulation
              </Label>
              <Controller
                name="regulation"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="regulation"
                    placeholder="e.g. R2022"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="academicYear"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Academic Year
              </Label>
              <Controller
                name="academicYear"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="academicYear"
                    placeholder="e.g. 2023-24"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto bg-primary hover:bg-primary/90 w-full border font-bold shadow-none"
            >
              {isSubmitting ? 'Deploying...' : 'Confirm Offering'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
