import type { ReactNode } from 'react';

export function FormField({
  label,
  description,
  children
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {description ? <small className="field-help">{description}</small> : null}
    </label>
  );
}
