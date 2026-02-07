import type { StatusQuarto } from '../types/quartos';

const statusConfig: Record<StatusQuarto, { label: string; className: string }> = {
  LIVRE: { label: 'Livre', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  OCUPADO: { label: 'Ocupado', className: 'bg-rose-100 text-rose-800 border-rose-300' },
  MANUTENCAO_LIMPEZA: { label: 'Manutenção e Limpeza', className: 'bg-amber-100 text-amber-800 border-amber-300' },
};

export function StatusChip({ status }: { status: StatusQuarto }) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-800' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}
