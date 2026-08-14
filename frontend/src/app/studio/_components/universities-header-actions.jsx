'use client';

import * as React from 'react';
import { Plus, Upload, Download, ClipboardCheck, Copy } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { StudioSearch } from './studio-search';
import { AddUniversityDialog } from './add-university-dialog';
import { ImportUniversitiesDialog } from './import-universities-dialog';
import { DropdownAction } from '@/components/dropdown-action';
import { UniversityFilters } from './university-filters';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';
import { getErrorMessage } from '@/lib/api-error';
import {
  generateCSV,
  downloadCSV,
  getCSVTemplateWithSample,
} from '@/lib/csv-utils';

export function UniversitiesHeaderActions({ search }) {
  const [importOpen, setImportOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const api = useApi();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await api.universities.listUniversities({ limit: 1000 }); // Fetch all
      const universities = res.data.data.items || [];
      const csv = generateCSV(universities);
      downloadCSV('universities-export.csv', csv);
      toast.success('Universities exported successfully');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to export universities'));
    } finally {
      setIsExporting(false);
    }
  };

  const copyTemplate = () => {
    const template = getCSVTemplateWithSample();
    navigator.clipboard.writeText(template);
    toast.success('CSV template copied to clipboard');
  };

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
      <StudioSearch
        placeholder="Search universities..."
        initialValue={search}
      />
      <UniversityFilters />
      <DropdownAction label="Management" tooltip="Studio Actions">
        <AddUniversityDialog
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
            >
              <Plus className="text-muted-foreground mr-3 size-4 transition-colors" />
              <span className="font-medium">Add University</span>
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem
          className="cursor-pointer rounded-md py-2.5"
          onSelect={(e) => {
            e.preventDefault();
            setImportOpen(true);
          }}
        >
          <Upload className="text-muted-foreground mr-3 size-4 transition-colors" />
          <span className="font-medium">Import CSV</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 border-b" />

        <DropdownMenuItem
          className="cursor-pointer rounded-md py-2.5"
          disabled={isExporting}
          onClick={handleExport}
        >
          <Download className="text-muted-foreground mr-3 size-4 transition-colors" />
          <span className="font-medium">
            {isExporting ? 'Exporting...' : 'Export to CSV'}
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer rounded-md py-2.5"
          onClick={copyTemplate}
        >
          <Copy className="text-muted-foreground mr-3 size-4 transition-colors" />
          <span className="font-medium">Copy Template</span>
        </DropdownMenuItem>
      </DropdownAction>

      <ImportUniversitiesDialog
        open={importOpen}
        onOpenChange={setImportOpen}
      />
    </div>
  );
}
