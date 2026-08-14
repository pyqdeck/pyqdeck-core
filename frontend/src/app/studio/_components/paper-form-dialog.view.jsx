'use client';

import * as React from 'react';
import { Plus, FileText } from 'lucide-react';
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

const EXAM_TYPES = [
  { value: 'end-sem', label: 'End Semester' },
  { value: 'regular', label: 'Regular' },
  { value: 're-exam', label: 'Re-exam' },
  { value: 'supplementary', label: 'Supplementary' },
  { value: 'internal', label: 'Internal' },
];

const labelClass = 'font-roboto text-xs font-bold tracking-wider uppercase';

export function PaperFormDialogView({
  form,
  isEdit,
  onSubmit,
  open,
  onOpenChange,
  trigger,
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="border shadow-none sm:max-w-[550px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <FileText className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              {isEdit ? 'Edit Paper' : 'Add Paper'}
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            {isEdit
              ? 'Update this exam paper’s details.'
              : 'Add a past exam paper to this subject offering.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className={labelClass}>
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Data Structures End Semester Exam Nov 2023"
              className="font-roboto border focus-visible:ring-0"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-destructive text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="examYear" className={labelClass}>
                Exam Year
              </Label>
              <Input
                id="examYear"
                type="number"
                className="font-roboto border focus-visible:ring-0"
                {...register('examYear')}
              />
              {errors.examYear && (
                <p className="text-destructive text-xs">
                  {errors.examYear.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="examType" className={labelClass}>
                Exam Type
              </Label>
              <Controller
                name="examType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="font-roboto w-full border focus:ring-0">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="border shadow-none">
                      {EXAM_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="session" className={labelClass}>
                Session
              </Label>
              <Input
                id="session"
                placeholder="e.g. Nov-Dec"
                className="font-roboto border focus-visible:ring-0"
                {...register('session')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="regulation" className={labelClass}>
                Regulation
              </Label>
              <Input
                id="regulation"
                placeholder="e.g. R2022"
                className="font-roboto border focus-visible:ring-0"
                {...register('regulation')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration" className={labelClass}>
                Duration (min)
              </Label>
              <Input
                id="duration"
                type="number"
                className="font-roboto border focus-visible:ring-0"
                {...register('duration')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxMarks" className={labelClass}>
                Max Marks
              </Label>
              <Input
                id="maxMarks"
                type="number"
                className="font-roboto border focus-visible:ring-0"
                {...register('maxMarks')}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug" className={labelClass}>
              Slug
            </Label>
            <Input
              id="slug"
              className="font-roboto border font-mono text-sm focus-visible:ring-0"
              {...register('slug')}
            />
            {errors.slug && (
              <p className="text-destructive text-xs">{errors.slug.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto bg-primary hover:bg-primary/90 w-full border font-bold shadow-none"
            >
              {isSubmitting ? (
                'Saving…'
              ) : (
                <>
                  <Plus className="mr-1.5 h-4 w-4" />
                  {isEdit ? 'Save changes' : 'Add paper'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
