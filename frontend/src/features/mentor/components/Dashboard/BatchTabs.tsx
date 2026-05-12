import type {
    BatchTabsProps,
  } from "../../types/mentor.types";
  
  export default function BatchTabs({
    batches,
    selectedBatchId,
    onSelect,
  }: BatchTabsProps) {
    return (
      <div className="batch-tabs">
  
        {batches.map((batch) => (
          <button
            key={batch.id}
            className={
              selectedBatchId === batch.id
                ? "active-batch"
                : "batch-btn"
            }
            onClick={() => onSelect(batch.id)}
          >
            {batch.name}
          </button>
        ))}
  
      </div>
    );
  }