'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { WipeDbCardView } from './wipe-db-card.view';
import { useApi } from '@/hooks/use-api';
import { getErrorMessage } from '@/lib/api-error';

export function WipeDbCard() {
  const [isWiping, setIsWiping] = useState(false);
  const api = useApi();

  const handleWipe = async () => {
    setIsWiping(true);
    const toastId = toast.loading('Wiping database content...');

    try {
      await api.maintenance.wipeDatabase();
      toast.success('Database wiped successfully', { id: toastId });
    } catch (error) {
      console.error('Wipe failed:', error);
      toast.error(getErrorMessage(error, 'An error occurred during wipe'), {
        id: toastId,
      });
    } finally {
      setIsWiping(false);
    }
  };

  return <WipeDbCardView isWiping={isWiping} onWipe={handleWipe} />;
}
