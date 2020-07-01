export interface Translatable {
  en: string;
  de: string;
  zh?: string;
}

export function isTranslatable(obj: any): obj is Translatable {
  return !!obj && typeof obj.en === 'string' && typeof obj.de === 'string';
}
