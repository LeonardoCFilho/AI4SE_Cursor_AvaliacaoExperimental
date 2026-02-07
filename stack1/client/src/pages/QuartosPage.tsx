import { useState, useEffect } from 'react';
import { listarQuartos, obterQuarto, cadastrarQuarto, editarQuarto, alterarStatusQuarto } from '../api/quartos';
import type { QuartoDto, QuartoListagemDto } from '../types/quartos';
import { QuartoForm } from '../components/QuartoForm';
import { TIPO_QUARTO_LABELS, TIPO_CAMA_LABELS, STATUS_QUARTO_OPTIONS } from '../constants/quartos';

export function QuartosPage() {
  const [quartos, setQuartos] = useState<QuartoListagemDto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [quartoParaEditar, setQuartoParaEditar] = useState<QuartoDto | null>(null);

  const carregarQuartos = async () => {
    setCarregando(true);
    setErro('');
    try {
      const data = await listarQuartos();
      setQuartos(data);
    } catch (err) {
      setErro((err as Error).message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarQuartos();
  }, []);

  useEffect(() => {
    if (editingId) {
      obterQuarto(editingId)
        .then(setQuartoParaEditar)
        .catch(() => setQuartoParaEditar(null));
    } else {
      setQuartoParaEditar(null);
    }
  }, [editingId]);

  const handleNovo = () => {
    setEditingId(null);
    setQuartoParaEditar(null);
    setShowForm(true);
  };

  const handleEditar = (id: number) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleCancelarForm = () => {
    setShowForm(false);
    setEditingId(null);
    setQuartoParaEditar(null);
  };

  const handleSubmit = async (dto: QuartoDto) => {
    if (dto.id) {
      await editarQuarto(dto.id, dto);
    } else {
      await cadastrarQuarto(dto);
    }
    await carregarQuartos();
    handleCancelarForm();
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await alterarStatusQuarto(id, status);
      await carregarQuartos();
    } catch (err) {
      setErro((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-teal-700 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Sistema de Reserva de Hotel</h1>
          <p className="text-teal-100 text-sm">Gestão de Quartos</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {showForm ? (
          <div className="mb-8">
            <QuartoForm
              initial={editingId && quartoParaEditar ? quartoParaEditar : null}
              onSubmit={handleSubmit}
              onCancel={handleCancelarForm}
            />
          </div>
        ) : (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleNovo}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium shadow-sm"
            >
              + Cadastrar quarto
            </button>
          </div>
        )}

        {erro && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
            {erro}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Listagem de quartos</h2>
          </div>

          {carregando ? (
            <div className="p-12 text-center text-slate-500">Carregando...</div>
          ) : quartos.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              Nenhum quarto cadastrado. Clique em &quot;Cadastrar quarto&quot; para começar.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-left text-sm font-medium">
                    <th className="px-6 py-3">Número</th>
                    <th className="px-6 py-3">Tipo</th>
                    <th className="px-6 py-3">Preço por diária (R$)</th>
                    <th className="px-6 py-3">Disponibilidade</th>
                    <th className="px-6 py-3">Camas</th>
                    <th className="px-6 py-3 w-24">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {quartos.map((q) => (
                    <tr key={q.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-800">{q.numero}</td>
                      <td className="px-6 py-4 text-slate-700">{TIPO_QUARTO_LABELS[q.tipo] ?? q.tipo}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {q.precoDiaria.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.id, e.target.value)}
                          className="text-sm border border-slate-300 rounded px-2 py-1 bg-white cursor-pointer"
                        >
                          {STATUS_QUARTO_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {q.camas?.length ? (
                            q.camas.map((c, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-0.5 text-xs bg-sky-100 text-sky-800 rounded"
                              >
                                {TIPO_CAMA_LABELS[c.tipo] ?? c.tipo}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-sm">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEditar(q.id)}
                          className="p-2 text-sky-600 hover:bg-sky-50 rounded"
                          title="Editar"
                        >
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
