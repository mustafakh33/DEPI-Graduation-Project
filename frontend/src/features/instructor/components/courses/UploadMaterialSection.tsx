import { Check, FileText, Trash2, Upload } from "lucide-react";
import type { UploadMaterialsSectionProps } from "../../types/lectureMaterials.types";
import UploadedFileCard from "./UploadedFileCard";

export default function UploadMaterialsSection({
  files,
  onSelectFiles,
  onDeleteAll,
}: UploadMaterialsSectionProps) {
  return (
    <section className="upload-section">
      <div className="section-header">
        <div className="title-wrap">
          <div className="section-icon section-icon--blue">
            <FileText size={20} aria-hidden />
          </div>
          <h2 className="section-title">Section 1: Upload Material</h2>
        </div>
        <span className="step-text">Step 1 of 2</span>
      </div>

      <div className="upload-layout">
        <label className="dropzone">
          <div className="upload-icon">
            <Upload size={28} aria-hidden />
          </div>
          <h3>Click or drag lecture files</h3>
          <p>
            Supported: PDF, MP4, PPTX, ZIP
            <br />
            (Up to 100MB per file)
          </p>
          <span className="browse-btn">Browse Files</span>
          <input
            type="file"
            multiple
            hidden
            accept=".pdf,.mp4,.pptx,.zip"
            onChange={(e) => onSelectFiles(e.target.files)}
          />
        </label>

        <div className="uploaded-files">
          <p className="queue-title">Queue ({files.length} files)</p>
          {files.length === 0 ? (
            <p className="queue-empty">No files in queue yet.</p>
          ) : (
            files.map((file) => (
              <UploadedFileCard key={file.id} file={file} />
            ))
          )}
        </div>
      </div>

      <div className="section-footer">
        <button
          type="button"
          className="delete-all-btn"
          onClick={onDeleteAll}
          disabled={files.length === 0}
        >
          <Trash2 size={16} aria-hidden />
          Delete All
        </button>
        <button type="button" className="confirm-btn" disabled={files.length === 0}>
          <Check size={18} aria-hidden />
          Confirm Upload
        </button>
      </div>
    </section>
  );
}
