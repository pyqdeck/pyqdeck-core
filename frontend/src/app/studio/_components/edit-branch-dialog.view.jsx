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

export function EditBranchDialogView({
  branch,
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
            Edit Branch
          </DialogTitle>
          <DialogDescription className="font-roboto">
            Update the settings for {branch?.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="edit-name" className="font-roboto font-bold">
              Branch Name
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="edit-name"
                  placeholder="e.g. Computer Engineering"
                  className="font-roboto border focus-visible:ring-0"
                />
              )}
            />
            {errors.name && (
              <p className="font-roboto text-destructive text-xs font-bold">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-shortName" className="font-roboto font-bold">
                Short Name
              </Label>
              <Controller
                name="shortName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="edit-shortName"
                    placeholder="e.g. COMP"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
              {errors.shortName && (
                <p className="font-roboto text-destructive text-xs font-bold">
                  {errors.shortName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="edit-branchCode"
                className="font-roboto font-bold"
              >
                Branch Code
              </Label>
              <Controller
                name="branchCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="edit-branchCode"
                    placeholder="e.g. 07"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
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
                  placeholder="e.g. computer-engineering"
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
