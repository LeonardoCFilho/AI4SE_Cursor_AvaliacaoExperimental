import { useState, useEffect } from 'react';
import type { QuartoDto, TipoQuarto, StatusQuarto, TipoCama, CamaDto } from '../types/quartos';

const TIPOS_QUARTO: { value: TipoQuarto; label: string }[] = [
  { value: 'BASICO', label: 'Básico' },
  { value: 'MODERNO', label: 'Moderno' },
  { value: 'LUXO', label: 'Luxo' },
];

const STATUS_QUARTO: { value: StatusQuarto; label: string }[] = [
  { value: 'LIVRE', label: 'Livre' },
  { value: 'OCUPADO', label: 'Ocupado' },
  { value: 'MANUTENCAO_LIMPEZA', label: 'Manutenção e Limpeza' },
];

const TIPOS_CAMA: { value: TipoCama; label: string }[] = [
  { value: 'SOLTEIRO', label: 'Solteiro' },
  { value: 'CASAL_KING', label: 'Casal King' },
  { value: 'CASAL_QUEEN', label: 'Casal Queen' },
];

interface QuartoFormProps {
  initial?: QuartoDto | null;
  onSubmit: (dto: QuartoDto) => Promise<void>;
  onCancel: () => void;
}

export function QuartoForm({ initial, onSubmit, onCancel }: QuartoFormProps) {
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState<TipoQuarto>('BASICO');
  const [capacidade, setCapacidade] = useState(1);
  const [precoDiaria, setPrecoDiaria] = useState(0);
  const [status, setStatus] = useState<StatusQuarto>('LIVRE');
  const [frigobar, setFrigobar] = useState(false);
  const [cafeManhaIncluso, setCafeManhaIncluso] = useState(false);
  const [arCondicionado, setArCondicionado] = useState(false);
  const [tv, setTv] = useState(false);
  const [camas, setCamas] = useState<CamaDto[]>([]);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const isEdicao = !!initial?.id;

  useEffect(() => {
    if (initial) {
      setNumero(initial.numero);
      setTipo(initial.tipo);
      setCapacidade(initial.capacidade ?? 1);
      setPrecoDiaria(initial.precoDiaria ?? 0);
      setStatus(initial.status ?? 'LIVRE');
      setFrigobar(initial.frigobar ?? false);
      setCafeManhaIncluso(initial.cafeManhaIncluso ?? false);
      setArCondicionado(initial.arCondicionado ?? false);
      setTv(initial.tv ?? false);
      setCamas(initial.camas?.length ? [...initial.camas] : []);
    }
  }, [initial]);

  const addCama = () => setCamas([...camas, { tipo: 'SOLTEIRO' }]);

  const removeCama = (idx: number) => setCamas(camas.filter((_, i) => i !== idx));

  const updateCama = (idx: number, tipo: TipoCama) => {
    const nov = [...camas];
    nov[idx] = { ...nov[idx], tipo };
    setCamas(nov);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSalvando(true);
    try {
      const dto: QuartoDto = {
        numero: numero.trim(),
        tipo,
        capacidade,
        precoDiaria,
        status,
        frigobar,
        cafeManhaIncluso,
        arCondicionado,
        tv,
        camas: camas.length ? camas : undefined,
      };
      if (isEdicao) dto.id = initial!.id;
      await onSubmit(dto);
    } catch (err) {
      setErro((err as Error).message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800">
        {isEdicao ? 'Editar quarto' : 'Cadastrar quarto'}
      </h2>

      {erro && (
        <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-sm border border-rose-200">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Número *</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo *</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoQuarto)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            {TIPOS_QUARTO.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Capacidade *</label>
          <input
            type="number"
            min={1}
            value={capacidade}
            onChange={(e) => setCapacidade(parseInt(e.target.value, 10) || 1)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preço por diária (R$) *</label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={precoDiaria}
            onChange={(e) => setPrecoDiaria(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        {isEdicao && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Disponibilidade</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusQuarto)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {STATUS_QUARTO.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Comodidades</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={frigobar} onChange={(e) => setFrigobar(e.target.checked)} />
            <span>Frigobar</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={cafeManhaIncluso} onChange={(e) => setCafeManhaIncluso(e.target.checked)} />
            <span>Café da manhã incluso</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={arCondicionado} onChange={(e) => setArCondicionado(e.target.checked)} />
            <span>Ar-condicionado</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={tv} onChange={(e) => setTv(e.target.checked)} />
            <span>TV</span>
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-slate-700">Camas</label>
          <button
            type="button"
            onClick={addCama}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            + Adicionar cama
          </button>
        </div>
        {camas.length === 0 ? (
          <p className="text-slate-500 text-sm">Nenhuma cama cadastrada. Clique em "Adicionar cama" para incluir.</p>
        ) : (
          <ul className="space-y-2">
            {camas.map((c, idx) => (
              <li key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                <select
                  value={c.tipo}
                  onChange={(e) => updateCama(idx, e.target.value as TipoCama)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                >
                  {TIPOS_CAMA.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeCama(idx)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded"
                  aria-label="Remover cama"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={salvando}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 font-medium"
        >
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
