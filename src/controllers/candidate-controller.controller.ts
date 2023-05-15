import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Candidate} from '../models';
import {CandidateRepository} from '../repositories';

export class CandidateControllerController {
  constructor(
    @repository(CandidateRepository)
    public candidateRepository: CandidateRepository,
  ) { }

  @post('/candidates')
  @response(200, {
    description: 'Candidate model instance',
    content: {'application/json': {schema: getModelSchemaRef(Candidate)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidate, {
            title: 'NewCandidate',
            exclude: ['id'],
          }),
        },
      },
    })
    candidate: Omit<Candidate, 'id'>,
  ): Promise<Candidate> {
    return this.candidateRepository.create(candidate);
  }

  @get('/candidates/count')
  @response(200, {
    description: 'Candidate model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Candidate) where?: Where<Candidate>,
  ): Promise<Count> {
    return this.candidateRepository.count(where);
  }

  @get('/candidates')
  @response(200, {
    description: 'Array of Candidate model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Candidate, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Candidate) filter?: Filter<Candidate>,
  ): Promise<Candidate[]> {
    return this.candidateRepository.find(filter);
  }

  @patch('/candidates')
  @response(200, {
    description: 'Candidate PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidate, {partial: true}),
        },
      },
    })
    candidate: Candidate,
    @param.where(Candidate) where?: Where<Candidate>,
  ): Promise<Count> {
    return this.candidateRepository.updateAll(candidate, where);
  }

  @get('/candidates/{id}')
  @response(200, {
    description: 'Candidate model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Candidate, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Candidate, {exclude: 'where'}) filter?: FilterExcludingWhere<Candidate>
  ): Promise<Candidate> {
    return this.candidateRepository.findById(String(id), filter);
  }

  @patch('/candidates/{id}')
  @response(204, {
    description: 'Candidate PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidate, {partial: true}),
        },
      },
    })
    candidate: Candidate,
  ): Promise<void> {
    await this.candidateRepository.updateById(String(id), candidate);
  }

  @put('/candidates/{id}')
  @response(204, {
    description: 'Candidate PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() candidate: Candidate,
  ): Promise<void> {
    await this.candidateRepository.replaceById(String(id), candidate);
  }

  @del('/candidates/{id}')
  @response(204, {
    description: 'Candidate DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.candidateRepository.deleteById(String(id));
  }
}
