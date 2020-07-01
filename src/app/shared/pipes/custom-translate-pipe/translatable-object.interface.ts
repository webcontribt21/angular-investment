import { Translatable } from '../../../core/models';

export type TranslatableObject = Translatable | LabelObject;

interface LabelObject {
  label: Translatable;
}
