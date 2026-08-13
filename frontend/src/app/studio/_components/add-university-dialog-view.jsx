import * as React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UniversityForm } from './university-form';

export function AddUniversityDialogView({
  open,
  onOpenChange,
  form,
  onSubmit,
  trigger,
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger || (
          <Button className="font-roboto h-10 border font-semibold">
            <Plus className="mr-2 h-4 w-4" /> Add University
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="font-roboto flex flex-col gap-0 overflow-hidden border-l p-0 shadow-none sm:max-w-[500px]">
        <SheetHeader className="bg-muted/5 border-b p-6">
          <SheetTitle className="text-2xl font-black tracking-tight">
            Add New University
          </SheetTitle>
          <SheetDescription>
            Register a new institution in the PyqDeck database.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-6">
            <form
              id="add-university-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-24"
            >
              <UniversityForm form={form} />
            </form>
          </div>
        </div>

        <SheetFooter className="bg-muted/10 flex-row items-center gap-3 border-t p-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-university-form"
            disabled={form.formState.isSubmitting}
            className="flex-1 font-bold"
          >
            {form.formState.isSubmitting ? 'Creating...' : 'Create University'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
