import type { QuartoDto, QuartoListagemDto } from '../types/quartos';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function listarQuartos(): Promise<QuartoListagemDto[]> {
  const res = await fetch(`${API_URL}/quartos`);
  if (!res.ok) throw new Error(await res.json().then((d) => d.erro || 'Erro ao listar'));
  return res.json();
}

export async function obterQuarto(id: number): Promise<QuartoDto> {
  const res = await fetch(`${API_URL}/quartos/${id}`);
  if (!res.ok) throw new Error(await res.json().then((d) => d.erro || 'Erro ao obter'));
  return res.json();
}

export async function cadastrarQuarto(dto: QuartoDto): Promise<QuartoDto> {
  const res = await fetch(`${API_URL}/quartos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error(await res.json().then((d) => d.erro || 'Erro ao cadastrar'));
  return res.json();
}

export async function editarQuarto(id: number, dto: QuartoDto): Promise<QuartoDto> {
  const res = await fetch(`${API_URL}/quartos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error(await res.json().then((d) => d.erro || 'Erro ao editar'));
  return res.json();
}

export async function alterarStatusQuarto(id: number, status: string): Promise<QuartoDto> {
  const res = await fetch(`${API_URL}/quartos/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(await res.json().then((d) => d.erro || 'Erro ao alterar status'));
  return res.json();
}
