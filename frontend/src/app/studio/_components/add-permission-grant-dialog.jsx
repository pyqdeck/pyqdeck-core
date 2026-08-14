'use client';

import * as React from 'react';
import { useApi } from '@/hooks/use-api';
import { AddPermissionGrantDialogView } from './add-permission-grant-dialog.view';

export const ROLE_TEMPLATES = [
  {
    value: 'moderator',
    label: 'Content Moderator',
    capabilities: ['content:create', 'content:moderate'],
  },
  {
    value: 'contributor',
    label: 'Content Contributor',
    capabilities: ['content:create', 'content:edit'],
  },
  { value: 'custom', label: 'Custom', capabilities: [] },
];

export function AddPermissionGrantDialog({ open, onOpenChange, onAdd }) {
  const api = useApi();

  const [scopeLevel, setScopeLevel] = React.useState('branch');
  const [templateValue, setTemplateValue] = React.useState('moderator');
  const [capabilities, setCapabilities] = React.useState(
    ROLE_TEMPLATES[0].capabilities
  );

  const [universities, setUniversities] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [semesters, setSemesters] = React.useState([]);
  const [offerings, setOfferings] = React.useState([]);

  const [universityId, setUniversityId] = React.useState('');
  const [branchId, setBranchId] = React.useState('');
  const [semesterId, setSemesterId] = React.useState('');
  const [offeringId, setOfferingId] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    api.universities
      .listUniversities({ limit: 100 })
      .then((res) => setUniversities(res.data?.data?.items || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  const resetForm = () => {
    setScopeLevel('branch');
    setTemplateValue('moderator');
    setCapabilities(ROLE_TEMPLATES[0].capabilities);
    setUniversityId('');
    setBranchId('');
    setSemesterId('');
    setOfferingId('');
    setBranches([]);
    setSemesters([]);
    setOfferings([]);
  };

  const handleOpenChange = (next) => {
    onOpenChange(next);
    if (!next) resetForm();
  };

  const handleScopeLevelChange = (level) => {
    setScopeLevel(level);
    setUniversityId('');
    setBranchId('');
    setSemesterId('');
    setOfferingId('');
    setBranches([]);
    setSemesters([]);
    setOfferings([]);
  };

  const handleUniversityChange = (id) => {
    setUniversityId(id);
    setBranchId('');
    setSemesterId('');
    setOfferingId('');
    setBranches([]);
    setSemesters([]);
    setOfferings([]);
  };

  const handleBranchChange = (id) => {
    setBranchId(id);
    setSemesterId('');
    setOfferingId('');
    setSemesters([]);
    setOfferings([]);
  };

  const handleSemesterChange = (id) => {
    setSemesterId(id);
    setOfferingId('');
    setOfferings([]);
  };

  const handleTemplateChange = (value) => {
    setTemplateValue(value);
    const template = ROLE_TEMPLATES.find((t) => t.value === value);
    if (template && template.value !== 'custom') {
      setCapabilities(template.capabilities);
    }
  };

  const toggleCapability = (capability) => {
    setCapabilities((prev) =>
      prev.includes(capability)
        ? prev.filter((c) => c !== capability)
        : [...prev, capability]
    );
  };

  const scopeId =
    {
      global: null,
      university: universityId,
      branch: branchId,
      semester: semesterId,
      subjectOffering: offeringId,
    }[scopeLevel] || null;

  const university = universities.find((u) => u.id === universityId);
  const branch = branches.find((b) => b.id === branchId);
  const semester = semesters.find((s) => s.id === semesterId);
  const offering = offerings.find((o) => o.id === offeringId);

  const scopeLabel =
    {
      global: 'Global',
      university: university?.name,
      branch:
        branch &&
        `${university?.shortName || university?.name} · ${branch.name}`,
      semester:
        semester &&
        `${branch?.shortName || branch?.name} · Semester ${semester.number}`,
      subjectOffering:
        offering &&
        `${branch?.shortName || branch?.name} · Sem ${semester?.number} · ${offering.subjectId?.name}`,
    }[scopeLevel] || null;

  const isReady =
    capabilities.length > 0 &&
    (scopeLevel === 'global' ? true : !!scopeId && !!scopeLabel);

  const handleSubmit = async () => {
    if (!isReady) return;
    setIsSubmitting(true);
    try {
      const template = ROLE_TEMPLATES.find((t) => t.value === templateValue);
      const templateName =
        template && template.value !== 'custom' ? `${template.label} — ` : '';
      await onAdd({
        capabilities,
        scopeLevel,
        scopeId: scopeLevel === 'global' ? undefined : scopeId,
        label: `${templateName}${scopeLabel || 'Global'}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AddPermissionGrantDialogView
      open={open}
      onOpenChange={handleOpenChange}
      scopeLevel={scopeLevel}
      onScopeLevelChange={handleScopeLevelChange}
      templateValue={templateValue}
      onTemplateChange={handleTemplateChange}
      capabilities={capabilities}
      onToggleCapability={toggleCapability}
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
      isReady={isReady}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}
