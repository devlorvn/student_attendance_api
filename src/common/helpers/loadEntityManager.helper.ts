import { ModuleRef } from '@nestjs/core';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

export const loadEntityManager = async (
  systemId: string,
  moduleRef: ModuleRef,
): Promise<EntityManager> => {
  return await moduleRef.get(getEntityManagerToken(`database-${systemId}`), {
    strict: false,
  });
};
