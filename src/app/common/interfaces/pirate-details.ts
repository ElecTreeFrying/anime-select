import { PirateAttrbutes } from './pirate-attributes';
import { PirateRelationships } from './pirate-relationships';

export interface PirateDetails {
  id: number;
  attributes: { PirateAttrbutes };
  relationships: { PirateRelationships };
  type: string;

}
