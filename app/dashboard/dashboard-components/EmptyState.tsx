export function EmptyState() {
  return (
    <div className={`empty-state text-center [padding:3rem_1rem]`}>
      <div className={`empty-state-icon mb-[1rem]`}>No results</div>
      <p className={`empty-state-text`}>No people match your filter criteria</p>
    </div>
  );
}
