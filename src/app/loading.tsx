export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="text-5xl" style={{ animation: "pineapple-spin 2s linear infinite" }}>
        🍍
      </div>
      <p className="text-sm italic text-muted">Sensing the spirits...</p>
    </div>
  );
}
