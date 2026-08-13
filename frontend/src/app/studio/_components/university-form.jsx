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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export function UniversityForm({ form, idPrefix = '' }) {
  return (
    <FieldGroup className="space-y-6">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
              University Name
            </FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}${field.name}`}
              aria-invalid={fieldState.invalid}
              placeholder="University of Mumbai"
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
                placeholder="e.g. MU"
                className="border focus-visible:ring-0"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
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
                placeholder="mumbai-university"
                className="border focus-visible:ring-0"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
                State
              </FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}${field.name}`}
                aria-invalid={fieldState.invalid}
                placeholder="Maharashtra"
                className="border focus-visible:ring-0"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
                Country
              </FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}${field.name}`}
                aria-invalid={fieldState.invalid}
                className="border focus-visible:ring-0"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>

      <Controller
        name="websiteUrl"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
              Official Website
            </FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}${field.name}`}
              aria-invalid={fieldState.invalid}
              placeholder="https://mu.ac.in"
              className="border focus-visible:ring-0"
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="logo"
        control={form.control}
        render={({ field, fieldState }) => {
          const logoUrl = field.value;
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
                Logo URL
              </FieldLabel>
              <div className="flex items-start gap-4">
                {logoUrl && (
                  <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt="Logo preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <Input
                    {...field}
                    id={`${idPrefix}${field.name}`}
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.com/logo.png"
                    className="border focus-visible:ring-0"
                  />
                  <FieldDescription>
                    Public URL for the institution&apos;s official logo.
                  </FieldDescription>
                </div>
              </div>
              <FieldError errors={[fieldState.error]} />
            </Field>
          );
        }}
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
                Enable or disable this institution across the platform.
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

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}${field.name}`}>
              Description
            </FieldLabel>
            <Textarea
              {...field}
              id={`${idPrefix}${field.name}`}
              aria-invalid={fieldState.invalid}
              placeholder="Brief overview of the institution..."
              className="min-h-[80px] border focus-visible:ring-0"
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
    </FieldGroup>
  );
}
