'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
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

export function AddSemesterDialogView({
  branches = [],
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
            variant="none"
            className="font-roboto hover:bg-primary hover:text-primary-foreground flex w-full items-center justify-start gap-2 border px-3 py-2 font-bold shadow-none transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Semester</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="border shadow-none sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="font-roboto text-xl font-bold">
            Initialize Semester
          </DialogTitle>
          <DialogDescription className="font-roboto">
            Define a new academic period for the selected course branch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="branchId" className="font-roboto font-bold">
              Target Branch
            </Label>
            <Controller
              name="branchId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="font-roboto w-full border focus:ring-0">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent className="border shadow-none">
                    {branches.map((branch) => (
                      <SelectItem
                        key={branch.id}
                        value={branch.id}
                        className="font-roboto"
                      >
                        {branch.name} ({branch.universityId?.shortName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.branchId && (
              <p className="font-roboto text-destructive text-xs font-bold">
                {errors.branchId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="number" className="font-roboto font-bold">
                Semester Number
              </Label>
              <Controller
                name="number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="number"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="e.g. 5"
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
              <Label htmlFor="slug" className="font-roboto font-bold">
                URL Slug
              </Label>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="slug"
                    placeholder="semester-5"
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
            <Label htmlFor="title" className="font-roboto font-bold">
              Display Title (Optional)
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="title"
                  placeholder="e.g. Semester 5 (Final Year)"
                  className="font-roboto border focus-visible:ring-0"
                />
              )}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto w-full border font-bold shadow-none"
            >
              {isSubmitting ? 'Creating Semester...' : 'Create Semester'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
