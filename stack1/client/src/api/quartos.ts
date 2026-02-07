import type { QuartoDto, QuartoListagemDto } from '../types/quartos';
import { fetchApi } from './httpClient';

/** VITE_API_URL para build; /api para dev (proxy no vite.config) */
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const listarQuartos = () =>
  fetchApi<QuartoListagemDto[]>(`${API_URL}/quartos`, undefined, 'Erro ao listar quartos');

export const obterQuarto = (id: number) =>
  fetchApi<QuartoDto>(`${API_URL}/quartos/${id}`, undefined, 'Erro ao obter quarto');

export const cadastrarQuarto = (dto: QuartoDto) =>
  fetchApi<QuartoDto>(`${API_URL}/quartos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }, 'Erro ao cadastrar quarto');

export const editarQuarto = (id: number, dto: QuartoDto) =>
  fetchApi<QuartoDto>(`${API_URL}/quartos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }, 'Erro ao editar quarto');

export const alterarStatusQuarto = (id: number, status: string) =>
  fetchApi<QuartoDto>(`${API_URL}/quartos/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }, 'Erro ao alterar status');
