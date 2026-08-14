'use client';

import * as React from 'react';
import { Plus, HelpCircle, X } from 'lucide-react';
import { Controller, useFieldArray } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const QUESTION_TYPES = ['mcq', 'short', 'long', 'numerical', 'coding'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const labelClass = 'font-roboto text-xs font-bold tracking-wider uppercase';

export function QuestionFormDialogView({
  form,
  isEdit,
  onSubmit,
  open,
  onOpenChange,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const type = watch?.('type');
  const optionsError = errors.options?.message || errors.options?.root?.message;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border shadow-none sm:max-w-[560px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <HelpCircle className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              {isEdit ? 'Edit Question' : 'Add Question'}
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            {isEdit
              ? 'Update this question.'
              : 'This question will be added and linked to this paper.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="mdText" className={labelClass}>
              Question text (Markdown)
            </Label>
            <Textarea
              id="mdText"
              rows={4}
              placeholder="e.g. Explain the working of a full adder circuit with truth table."
              className="font-roboto border focus-visible:ring-0"
              {...register('mdText')}
            />
            {errors.mdText && (
              <p className="text-destructive text-xs">
                {errors.mdText.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type" className={labelClass}>
                Type
              </Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="font-roboto w-full border focus:ring-0">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="border shadow-none">
                      {QUESTION_TYPES.map((t) => (
                        <SelectItem key={t} value={t} className="capitalize">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty" className={labelClass}>
                Difficulty
              </Label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="font-roboto w-full border focus:ring-0">
                      <SelectValue placeholder="Not set" />
                    </SelectTrigger>
                    <SelectContent className="border shadow-none">
                      {DIFFICULTIES.map((d) => (
                        <SelectItem key={d} value={d} className="capitalize">
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {type === 'mcq' && (
            <div className="grid gap-2">
              <Label className={labelClass}>Answer options</Label>
              <Controller
                name="correctOptionIndex"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={
                      field.value === '' || field.value == null
                        ? ''
                        : String(field.value)
                    }
                    onValueChange={(val) => field.onChange(Number(val))}
                    className="gap-2"
                  >
                    {fields.map((optionField, index) => (
                      <div
                        key={optionField.id}
                        className="flex items-center gap-2"
                      >
                        <RadioGroupItem
                          value={String(index)}
                          id={`correct-option-${index}`}
                        />
                        <Input
                          className="font-roboto flex-1 border focus-visible:ring-0"
                          placeholder={`Option ${index + 1}`}
                          {...register(`options.${index}.text`)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => {
                            remove(index);
                            if (field.value === index) field.onChange('');
                            else if (field.value > index)
                              field.onChange(field.value - 1);
                          }}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove option</span>
                        </Button>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="font-roboto w-fit gap-1.5 border font-bold shadow-none"
                onClick={() => append({ text: '' })}
              >
                <Plus className="h-3.5 w-3.5" />
                Add option
              </Button>
              {optionsError && (
                <p className="text-destructive text-xs">{optionsError}</p>
              )}
              {errors.correctOptionIndex && (
                <p className="text-destructive text-xs">
                  {errors.correctOptionIndex.message}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="marks" className={labelClass}>
                Marks
              </Label>
              <Input
                id="marks"
                type="number"
                className="font-roboto border focus-visible:ring-0"
                {...register('marks')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estimatedTime" className={labelClass}>
                Est. time (min)
              </Label>
              <Input
                id="estimatedTime"
                type="number"
                className="font-roboto border focus-visible:ring-0"
                {...register('estimatedTime')}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Controller
              name="isVerified"
              control={control}
              render={({ field }) => (
                <Switch
                  id="isVerified"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="isVerified"
              className="font-roboto text-sm font-bold"
            >
              Mark as verified
            </Label>
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
                  {isEdit ? 'Save changes' : 'Add question'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
