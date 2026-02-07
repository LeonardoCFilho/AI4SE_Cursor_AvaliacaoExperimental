"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoService = void 0;
const enums_1 = require("../../domain/enums");
const errors_1 = require("../../domain/errors");
/**
 * Casos de uso do módulo de quartos (Application Service / Use Case).
 *
 * Decisão: Service orquestra validação, repositório e mapeamento. Não contém lógica
 * de persistência nem de conversão — delega a Validator, Repository e Mapper.
 *
 * Decisão: Injeção de dependências no construtor (DIP). Facilita testes unitários
 * com mocks de repositório, validator e mapper.
 *
 * Decisão: ensureNumeroUnico() é regra de negócio (RF-04.5) — fica no Service,
 * não no Validator. Validator trata formato; Service trata unicidade (requer I/O).
 */
class QuartoService {
    constructor(repository, mapper, validator) {
        this.repository = repository;
        this.mapper = mapper;
        this.validator = validator;
    }
    async listar() {
        const quartos = await this.repository.findAll();
        return quartos.map((q) => this.mapper.toListagemDto(q));
    }
    async obterPorId(id) {
        return this.repository.findById(id);
    }
    async cadastrar(dto) {
        this.validator.validate(dto, false);
        await this.ensureNumeroUnico(dto.numero);
        // id=0 indica criação; repositório gera id e persiste
        const quarto = this.mapper.toDomain({ ...dto, status: dto.status ?? enums_1.StatusQuarto.LIVRE }, 0);
        return this.repository.save(quarto);
    }
    async editar(dto) {
        this.validator.validate(dto, true);
        const existente = await this.repository.findById(dto.id);
        if (!existente) {
            throw new errors_1.NotFoundError('Quarto não encontrado');
        }
        await this.ensureNumeroUnico(dto.numero, dto.id);
        const quarto = this.mapper.toDomain(dto, dto.id);
        return this.repository.save(quarto);
    }
    async alterarStatus(id, status) {
        const quarto = await this.repository.findById(id);
        if (!quarto)
            return null;
        const atualizado = this.mapper.cloneWithStatus(quarto, status);
        return this.repository.save(atualizado);
    }
    async ensureNumeroUnico(numero, excludeId) {
        const existente = await this.repository.findByNumero(numero, excludeId);
        if (existente) {
            throw new errors_1.ConflictError(`Já existe um quarto com o número ${numero}`);
        }
    }
}
exports.QuartoService = QuartoService;
