'use client';

import * as React from 'react';
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
import { Label } from '@/components/ui/label';

export function EditSemesterDialogView({
  semester,
  form,
  onSubmit,
  open,
  onOpenChange,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border shadow-none sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="font-roboto text-xl font-bold">
            Edit Semester
          </DialogTitle>
          <DialogDescription className="font-roboto">
            Update the settings for Semester {semester?.number}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-number" className="font-roboto font-bold">
                Semester Number
              </Label>
              <Controller
                name="number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="edit-number"
                    type="number"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
              {errors.number && (
                <p className="font-roboto text-destructive text-xs font-bold">
                  {errors.number.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-slug" className="font-roboto font-bold">
                URL Slug
              </Label>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="edit-slug"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
              {errors.slug && (
                <p className="font-roboto text-destructive text-xs font-bold">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-title" className="font-roboto font-bold">
              Display Title
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="edit-title"
                  className="font-roboto border focus-visible:ring-0"
                />
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto w-full border font-bold shadow-none"
            >
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
