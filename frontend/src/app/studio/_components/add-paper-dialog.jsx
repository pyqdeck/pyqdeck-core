'use client';

import * as React from 'react';
import { useApi } from '@/hooks/use-api';
import { AddPaperDialogView } from './add-paper-dialog.view';
import { PaperFormDialog } from './paper-form-dialog';

export function AddPaperDialog({ onAdd }) {
  const api = useApi();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [selectedOffering, setSelectedOffering] = React.useState(null);

  const [universities, setUniversities] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [semesters, setSemesters] = React.useState([]);
  const [offerings, setOfferings] = React.useState([]);

  const [universityId, setUniversityId] = React.useState('');
  const [branchId, setBranchId] = React.useState('');
  const [semesterId, setSemesterId] = React.useState('');
  const [offeringId, setOfferingId] = React.useState('');

  React.useEffect(() => {
    if (!pickerOpen) return;
    api.universities
      .listUniversities({ limit: 100 })
      .then((res) => setUniversities(res.data?.data?.items || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickerOpen]);

  React.useEffect(() => {
    if (!universityId) return;
    api.universities
      .listBranches(universityId, { limit: 100 })
      .then((res) => setBranches(res.data?.data?.items || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universityId]);

  React.useEffect(() => {
    if (!branchId) return;
    api.branches
      .listSemesters(branchId)
      .then((res) => setSemesters(res.data?.data?.items || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchId]);

  React.useEffect(() => {
    if (!semesterId) return;
    api.subjectOfferings
      .listSubjectOfferings({ semesterId, limit: 100 })
      .then((res) => setOfferings(res.data?.data?.items || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterId]);

  const handleUniversityChange = (id) => {
    setUniversityId(id);
    setBranchId('');
    setBranches([]);
    setSemesterId('');
    setSemesters([]);
    setOfferingId('');
    setOfferings([]);
  };

  const handleBranchChange = (id) => {
    setBranchId(id);
    setSemesterId('');
    setSemesters([]);
    setOfferingId('');
    setOfferings([]);
  };

  const handleSemesterChange = (id) => {
    setSemesterId(id);
    setOfferingId('');
    setOfferings([]);
  };

  const resetPicker = () => {
    setUniversityId('');
    setBranchId('');
    setSemesterId('');
    setOfferingId('');
    setBranches([]);
    setSemesters([]);
    setOfferings([]);
  };

  const handleOpenChange = (open) => {
    setPickerOpen(open);
    if (!open) resetPicker();
  };

  const handleContinue = () => {
    const offering = offerings.find((o) => o.id === offeringId);
    if (!offering) return;
    setSelectedOffering(offering);
    setPickerOpen(false);
    resetPicker();
    setFormOpen(true);
  };

  return (
    <>
      <AddPaperDialogView
        open={pickerOpen}
        onOpenChange={handleOpenChange}
        universities={universities}
        branches={branches}
        semesters={semesters}
        offerings={offerings}
        universityId={universityId}
        branchId={branchId}
        semesterId={semesterId}
        offeringId={offeringId}
        onUniversityChange={handleUniversityChange}
        onBranchChange={handleBranchChange}
        onSemesterChange={handleSemesterChange}
        onOfferingChange={setOfferingId}
        onContinue={handleContinue}
      />
      <PaperFormDialog
        offering={selectedOffering}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={onAdd}
      />
    </>
  );
}
