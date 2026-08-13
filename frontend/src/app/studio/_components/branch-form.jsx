'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BranchForm({
  form,
  universities = [],
  idPrefix = '',
  showUniversitySelect = false,
}) {
  return (
    <FieldGroup className="gap-0 space-y-6">
      {showUniversitySelect && (
        <Controller
          name="universityId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
                University
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id={`${idPrefix}${field.name}`}
                  className="border focus:ring-0"
                >
                  <SelectValue placeholder="Select a university" />
                </SelectTrigger>
                <SelectContent className="border shadow-none">
                  {universities.map((uni) => (
                    <SelectItem key={uni.id} value={uni.id}>
                      {uni.name} ({uni.shortName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      )}

      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
              Branch Name
            </FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}${field.name}`}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Computer Science & Engineering"
              className="border focus-visible:ring-0"
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="shortName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
                Short Name
              </FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}${field.name}`}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. CSE"
                className="border focus-visible:ring-0"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="branchCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
                Branch Code
              </FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}${field.name}`}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. 05"
                className="border focus-visible:ring-0"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>

      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
              URL Slug
            </FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}${field.name}`}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. computer-science"
              className="border focus-visible:ring-0"
            />
            <FieldDescription>
              Unique identifier for URLs. Auto-generated if left blank.
            </FieldDescription>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="isActive"
        control={form.control}
        render={({ field }) => (
          <Field
            orientation="horizontal"
            className="bg-muted/5 hover:bg-muted/10 items-center justify-between rounded-xl border p-4 transition-colors"
          >
            <div className="space-y-1">
              <FieldLabel
                htmlFor={`${idPrefix}${field.name}`}
                className="text-base font-bold"
              >
                Active Status
              </FieldLabel>
              <FieldDescription>
                Enable or disable this branch across the platform.
              </FieldDescription>
            </div>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={`${idPrefix}${field.name}`}
              className="data-[state=checked]:bg-primary"
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
}
