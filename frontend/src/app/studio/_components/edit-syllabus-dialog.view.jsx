'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, Loader2, Settings2 } from 'lucide-react';

export function EditSyllabusDialogView({
  syllabus,
  form,
  open,
  onOpenChange,
  onSubmit,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  if (!syllabus) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border shadow-none sm:max-w-[500px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Settings2 className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              Update Syllabus Metadata
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto">
            Modify the overall description and visibility of this syllabus.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid gap-2">
            <Label className="font-roboto text-muted-foreground text-xs font-bold tracking-widest uppercase">
              Description
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Enter a detailed overview of this syllabus..."
                  className="font-roboto focus-visible:ring-primary/50 min-h-[120px] border text-sm"
                />
              )}
            />
            {errors.description && (
              <p className="font-roboto text-destructive text-[10px] font-bold">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="font-roboto text-sm font-bold">
                Active Status
              </Label>
              <div className="font-roboto text-muted-foreground text-xs">
                Mark as active to allow paper generation and question mapping.
              </div>
            </div>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              className="font-roboto border font-bold"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-roboto bg-primary hover:bg-primary/90 min-w-[120px] font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
