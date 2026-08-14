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
import { ImportBranchesView } from './import-branches-view';

const branchSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shortName: z
    .string()
    .min(2, 'Short name must be at least 2 characters')
    .max(20),
  branchCode: z.string().optional().or(z.literal('')),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  isActive: z.boolean().default(true),
});

export function ImportBranchesDialog({
  open,
  onOpenChange,
  universityId,
  universityName,
}) {
  const [file, setFile] = React.useState(null);
  const [pastedText, setPastedText] = React.useState('');
  const [data, setData] = React.useState([]);
  const [parseErrors, setParseErrors] = React.useState([]);
  const [isImporting, setIsImporting] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(null);

  const api = useApi();
  const router = useRouter();

  const editForm = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: '',
      shortName: '',
      branchCode: '',
      slug: '',
      isActive: true,
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
        toast.success(`Successfully parsed ${rows.length} rows`);
        setPastedText('');
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
    if (data.length === 0 || !universityId) return;

    setIsImporting(true);
    try {
      // Use direct request as SDK might not be updated yet
      const response = await api.request({
        path: `/universities/${universityId}/branches/bulk`,
        method: 'POST',
        body: data,
        type: 'json',
      });

      const result = response.data?.data || response.data || response;
      const summary = result.summary || { success: data.length, failed: 0 };

      if (summary.failed > 0) {
        toast.warning(
          `Import completed: ${summary.success} added, ${summary.failed} skipped.`
        );
      } else {
        toast.success(`Successfully imported ${summary.success} branches!`);
      }

      // Reset states
      setFile(null);
      setPastedText('');
      setData([]);
      setParseErrors([]);
      editForm.reset();

      router.refresh();
      onOpenChange(false);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to import branches'));
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <ImportBranchesView
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
      branchSchema={branchSchema}
      universityName={universityName || 'Selected University'}
    />
  );
}
