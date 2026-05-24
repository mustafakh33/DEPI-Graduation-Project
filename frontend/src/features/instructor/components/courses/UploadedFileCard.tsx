import type {
  UploadedFileCardProps,
} from "../../types/lectureMaterials.types";
export default function UploadedFileCard({
  file, onRemove,
}: UploadedFileCardProps) {
  return (
    <div className="uploaded-file-card">
      <div className="file-icon">📄</div>

      <div className="file-info">
        <h4>{file.name}</h4>
        <p>
          {file.size} • {file.status}
        </p>
      </div>

      <button onClick={() => onRemove(file.id)}>✓</button>
    </div>
  );
}