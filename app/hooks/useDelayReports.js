'use client';
import { useCallback, useEffect, useState } from 'react';
import { createReport, deleteReport, getReports, updateReport } from '../services/reportsApi';

export default function useDelayReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const refresh = useCallback(async () => {
    setLoading(true); setError('');
    try { setReports(await getReports()); } catch { setError('Não foi possível consultar os avisos agora.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  const add = async (report) => { setSaving(true); try { const saved = await createReport(report); setReports((items) => [saved, ...items]); return true; } catch { setError('Não foi possível enviar seu aviso.'); return false; } finally { setSaving(false); } };
  const edit = async (report) => { setSaving(true); try { const saved = await updateReport(report); setReports((items) => items.map((item) => item.id === saved.id ? saved : item)); return true; } catch { setError('Não foi possível atualizar o aviso.'); return false; } finally { setSaving(false); } };
  const remove = async (id) => { try { await deleteReport(id); setReports((items) => items.filter((item) => item.id !== id)); } catch { setError('Não foi possível excluir o aviso.'); } };
  return { reports, loading, error, saving, add, edit, remove, clearError: () => setError('') };
}
