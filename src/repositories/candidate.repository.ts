import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatasourcesDataSource} from '../datasources/s-datasource.datasource';
import {Candidate, CandidateRelations} from '../models';

export class CandidateRepository extends DefaultCrudRepository<
  Candidate,
  typeof Candidate.prototype.email,
  CandidateRelations
> {
  constructor(
    @inject('datasources.datasources') dataSource: DatasourcesDataSource,
  ) {
    super(Candidate, dataSource);
  }
}
