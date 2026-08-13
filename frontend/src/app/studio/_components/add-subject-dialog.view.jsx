'use client';

import * as React from 'react';
import { Plus, BookOpen, Hash, FileText } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function AddSubjectDialogView({
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
            variant="none"
            className="font-roboto hover:bg-primary hover:text-primary-foreground flex w-full items-center justify-start gap-2 border px-3 py-2 font-bold shadow-none transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Subject</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="border shadow-none sm:max-w-[500px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <BookOpen className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              Register New Subject
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto">
            Add a new subject to the global curriculum database.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="font-roboto font-bold">
              Subject Name
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="e.g. Data Structures and Algorithms"
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
              <Label htmlFor="shortName" className="font-roboto font-bold">
                Short Name
              </Label>
              <Controller
                name="shortName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="shortName"
                    placeholder="e.g. DSA"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subjectCode" className="font-roboto font-bold">
                Subject Code
              </Label>
              <Controller
                name="subjectCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="subjectCode"
                    placeholder="e.g. CS301"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="credits" className="font-roboto font-bold">
                Credits
              </Label>
              <Controller
                name="credits"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="credits"
                    type="number"
                    min="0"
                    placeholder="e.g. 4"
                    className="font-roboto border focus-visible:ring-0"
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                )}
              />
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
                    placeholder="e.g. data-structures"
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
            <Label htmlFor="description" className="font-roboto font-bold">
              Description
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Describe the subject objectives and curriculum scope..."
                  className="font-roboto min-h-[100px] resize-none border focus-visible:ring-0"
                />
              )}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto bg-primary hover:bg-primary/90 w-full border font-bold shadow-none"
            >
              {isSubmitting ? 'Registering...' : 'Register Subject'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
