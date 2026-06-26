type ResultsInfoProps = {
  filteredCount: number;
  totalCount: number;
};

export function ResultsInfo({ filteredCount, totalCount }: ResultsInfoProps) {
  return (
    <div className="results-info">
      Showing <span className="results-count">{filteredCount}</span> of{' '}
      <span className="results-count">{totalCount}</span> people
    </div>
  );
}
