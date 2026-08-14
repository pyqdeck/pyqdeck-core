'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useApi } from '@/hooks/use-api';
import { parseCSV } from '@/lib/csv-utils';
import { getErrorMessage } from '@/lib/api-error';
import { ImportUniversitiesView } from './import-universities-view';

const universitySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shortName: z
    .string()
    .min(2, 'Short name must be at least 2 characters')
    .max(10, 'Too long'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  websiteUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  state: z.string().min(2, 'State is required'),
  country: z.string().default('India'),
  logo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
});

export function ImportUniversitiesDialog({ open, onOpenChange }) {
  const [file, setFile] = React.useState(null);
  const [pastedText, setPastedText] = React.useState('');
  const [data, setData] = React.useState([]);
  const [parseErrors, setParseErrors] = React.useState([]);
  const [isImporting, setIsImporting] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(null);

  const api = useApi();
  const router = useRouter();

  const editForm = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: '',
      shortName: '',
      slug: '',
      websiteUrl: '',
      state: '',
      country: 'India',
      logo: '',
      isActive: true,
      description: '',
    },
  });

  const handleFileChange = React.useCallback(async (newFile) => {
    if (!newFile) {
      setFile(null);
      setData([]);
      setParseErrors([]);
      return;
    }

    setFile(newFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const { rows, errors } = parseCSV(text);
        setData(rows);
        setParseErrors(errors);
        if (rows.length > 0) {
          toast.success(`Successfully parsed ${rows.length} rows`);
        } else {
          toast.error('No data found in the CSV file');
        }
      } catch (err) {
        toast.error(err.message || 'Failed to parse CSV');
        setFile(null);
      }
    };
    reader.readAsText(newFile);
  }, []);

  const handleProcessPaste = () => {
    if (!pastedText.trim()) return;

    try {
      const { rows, errors } = parseCSV(pastedText);
      setData(rows);
      setParseErrors(errors);
      if (rows.length > 0) {
        toast.success(`Successfully parsed ${rows.length} rows from text`);
        setPastedText(''); // Clear paste area after processing
      } else {
        toast.error('No data found in the pasted content');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to parse pasted CSV');
    }
  };

  const handleEditSubmit = (values) => {
    if (editingIndex === null) return;

    const newData = [...data];
    newData[editingIndex] = values;
    setData(newData);
    setEditingIndex(null);
    toast.success('Row updated successfully');
  };

  const handleImport = async () => {
    if (data.length === 0) return;

    setIsImporting(true);
    try {
      if (api.universities.bulkCreateUniversities) {
        const response = await api.universities.bulkCreateUniversities(data);
        const result = response.data?.data || response.data || response;
        const summary = result.summary || { success: data.length, failed: 0 };

        if (summary.failed > 0) {
          toast.warning(
            `Import completed: ${summary.success} added, ${summary.failed} skipped (duplicates/errors).`,
            { duration: 3000 }
          );
        } else {
          toast.success(
            `Successfully imported all ${summary.success} universities!`
          );
        }
      } else {
        // Fallback for older SDK versions
        let successCount = 0;
        let failCount = 0;

        const promises = data.map(async (item) => {
          try {
            await api.universities.createUniversity(item);
            successCount++;
          } catch (err) {
            failCount++;
          }
        });

        await Promise.all(promises);

        if (failCount > 0) {
          toast.warning(
            `Import completed with issues. ${successCount} succeeded, ${failCount} failed.`
          );
        } else {
          toast.success(
            `Successfully imported all ${successCount} universities!`
          );
        }
      }

      // Clear all states
      setFile(null);
      setPastedText('');
      setData([]);
      setParseErrors([]);
      editForm.reset({
        name: '',
        shortName: '',
        slug: '',
        websiteUrl: '',
        state: '',
        country: 'India',
        logo: '',
        isActive: true,
        description: '',
      });

      // Refresh data and close
      router.refresh();
      onOpenChange(false);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to import data'));
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <ImportUniversitiesView
      open={open}
      onOpenChange={onOpenChange}
      file={file}
      onFileChange={handleFileChange}
      pastedText={pastedText}
      onPastedTextChange={setPastedText}
      onProcessPaste={handleProcessPaste}
      data={data}
      onDataChange={setData}
      errors={parseErrors}
      isImporting={isImporting}
      onImport={handleImport}
      editingIndex={editingIndex}
      setEditingIndex={setEditingIndex}
      editForm={editForm}
      onEditSubmit={handleEditSubmit}
      universitySchema={universitySchema}
    />
  );
}
