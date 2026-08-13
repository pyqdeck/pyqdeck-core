'use client';

import * as React from 'react';
import { Edit, BookOpen, Hash, FileText, CheckCircle2 } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export function EditSubjectDialogView({
  subject,
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

  if (!subject) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border shadow-none sm:max-w-[500px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-warning/10 text-warning rounded-lg p-2">
              <Edit className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              Update Curriculum
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto">
            Modify subject metadata and core requirements.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name" className="font-roboto font-bold">
              Subject Name
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="edit-name"
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
                    placeholder="e.g. DSA"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="edit-subjectCode"
                className="font-roboto font-bold"
              >
                Subject Code
              </Label>
              <Controller
                name="subjectCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="edit-subjectCode"
                    placeholder="e.g. CS301"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-credits" className="font-roboto font-bold">
                Credits
              </Label>
              <Controller
                name="credits"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="edit-credits"
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
            <div className="flex items-center space-x-2 pt-6">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="edit-active"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="edit-active"
                className="font-roboto text-sm font-bold"
              >
                Active in Curriculum
              </Label>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-description" className="font-roboto font-bold">
              Description
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="edit-description"
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
              className="font-roboto bg-warning hover:bg-warning/90 w-full border font-bold shadow-none"
            >
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
