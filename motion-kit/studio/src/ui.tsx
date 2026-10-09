import { useRef, useState, type ReactNode } from "react";
import { api, type FileInfo, type UploadKind } from "./api.ts";

export const Section: React.FC<{ title: string; hint?: ReactNode; children: ReactNode; right?: ReactNode }> = ({ title, hint, children, right }) => (
  <section className="section">
    <header>
      <div>
        <h3>{title}</h3>
        {hint ? <p className="hint">{hint}</p> : null}
      </div>
      {right}
    </header>
    {children}
  </section>
);

export const Row: React.FC<{ label: string; hint?: ReactNode; children: ReactNode }> = ({ label, hint, children }) => (
  <label className="row">
    <span className="row-label">{label}</span>
    <span className="row-input">{children}</span>
    {hint ? <span className="hint">{hint}</span> : null}
  </label>
);

export const Chips: React.FC<{ options: string[]; value?: string; onChange: (v: string | undefined) => void; allowNone?: string }> = ({ options, value, onChange, allowNone }) => (
  <div className="chips">
    {allowNone ? (
      <button type="button" className={value === undefined ? "chip on" : "chip"} onClick={() => onChange(undefined)}>
        {allowNone}
      </button>
    ) : null}
    {options.map((o) => (
      <button type="button" key={o} className={value === o ? "chip on" : "chip"} onClick={() => onChange(o)}>
        {o}
      </button>
    ))}
  </div>
);

/** A selectable card. A div (not a button) so cards can hold their own buttons, e.g. sound previews. */
export const Card: React.FC<{ selected?: boolean; onClick?: () => void; children: ReactNode; className?: string }> = ({ selected, onClick, children, className }) => (
  <div
    role="button"
    tabIndex={0}
    aria-pressed={selected}
    className={`card ${selected ? "on" : ""} ${className ?? ""}`}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.();
      }
    }}
  >
    {children}
  </div>
);

export const Swatch: React.FC<{ hex: string; label?: string; onClick?: () => void; size?: number }> = ({ hex, label, onClick, size = 28 }) =>
  onClick ? (
    <button type="button" className="swatch" title={label ?? hex} onClick={onClick} style={{ width: size, height: size, background: hex }} />
  ) : (
    <span className="swatch" title={label ?? hex} style={{ width: size, height: size, background: hex, display: "inline-block" }} />
  );

const HEX = /^#[0-9a-fA-F]{6}$/;
export const ColorInput: React.FC<{ value?: string; onChange: (v: string | undefined) => void; placeholder?: string }> = ({ value, onChange, placeholder }) => {
  const [draft, setDraft] = useState(value ?? "");
  const shown = draft !== (value ?? "") && !HEX.test(draft) ? draft : (value ?? "");
  return (
    <span className="color-input">
      <input type="color" value={value ?? "#000000"} onChange={(e) => onChange(e.target.value.toUpperCase())} />
      <input
        type="text"
        value={shown}
        placeholder={placeholder ?? "#RRGGBB"}
        onChange={(e) => {
          setDraft(e.target.value);
          if (HEX.test(e.target.value)) onChange(e.target.value.toUpperCase());
          if (e.target.value === "") onChange(undefined);
        }}
      />
      {value ? (
        <button type="button" className="link" onClick={() => onChange(undefined)}>
          clear
        </button>
      ) : null}
    </span>
  );
};

/** Upload + pick a file from public/<kind>/. */
export const FilePicker: React.FC<{
  kind: UploadKind;
  accept: string;
  value?: string;
  onChange: (path: string | undefined) => void;
  files: FileInfo[];
  onUploaded: () => void;
}> = ({ kind, accept, value, onChange, files, onUploaded }) => {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <span className="file-picker">
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value || undefined)}>
        <option value="">— none —</option>
        {files.map((f) => (
          <option key={f.path} value={f.path}>
            {f.name}
          </option>
        ))}
        {value && !files.some((f) => f.path === value) ? <option value={value}>{value}</option> : null}
      </select>
      <button type="button" disabled={busy} onClick={() => input.current?.click()}>
        {busy ? "Uploading…" : "Upload"}
      </button>
      <input
        ref={input}
        type="file"
        accept={accept}
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          setErr(null);
          try {
            const { path } = await api.upload(kind, file);
            onUploaded();
            onChange(path);
          } catch (x) {
            setErr((x as Error).message);
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
      {err ? <span className="error">{err}</span> : null}
    </span>
  );
};

export const Banner: React.FC<{ kind: "error" | "warning" | "note" | "ok"; children: ReactNode }> = ({ kind, children }) => <div className={`banner ${kind}`}>{children}</div>;
