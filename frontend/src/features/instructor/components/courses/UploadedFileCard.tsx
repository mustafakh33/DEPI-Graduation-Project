import { Check, FileText, Film, Presentation, Archive } from "lucide-react";
import type { UploadedFileCardProps } from "../../types/lectureMaterials.types";

function FileTypeIcon({ type }: { type: UploadedFileCardProps["file"]["type"] }) {
  const iconProps = { size: 20, "aria-hidden": true as const };

  switch (type) {
    case "mp4":
      return <Film {...iconProps} />;
    case "pptx":
      return <Presentation {...iconProps} />;
    case "zip":
      return <Archive {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
}

export default function UploadedFileCard({ file }: UploadedFileCardProps) {
  const isUploading = file.status === "uploading";

  return (
    <div className={`uploaded-file-card ${isUploading ? "uploaded-file-card--uploading" : ""}`}>
      <div className={`file-icon file-icon--${file.type}`}>
        <FileTypeIcon type={file.type} />
      </div>

      <div className="file-info">
        <h4>{file.name}</h4>
        <p className="file-meta">
          {file.size}
          {!isUploading && <span className="file-status-text"> • 100% Uploaded</span>}
        </p>
        {isUploading && (
          <div className="file-progress">
            <div
              className="file-progress-fill"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="file-action">
        {isUploading ? (
          <span className="file-progress-pct">{file.progress}%</span>
        ) : (
          <span className="file-complete" aria-label="Upload complete">
            <Check size={20} />
          </span>
        )}
      </div>
    </div>
  );
}
