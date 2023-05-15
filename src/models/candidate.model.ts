import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Candidate extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'date',
    required: true,
  })
  dob: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'object',
  })
  pic?: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Candidate>) {
    super(data);
  }
}

export interface CandidateRelations {
  // describe navigational properties here
}

export type CandidateWithRelations = Candidate & CandidateRelations;
