import type {
  UploadMaterialsSectionProps,
} from "../../types/lectureMaterials.types";

import UploadedFileCard from "./UploadedFileCard";

export default function UploadMaterialsSection({
  files,
  onSelectFiles,
  onRemoveFile,
}: UploadMaterialsSectionProps) {

  return (
    <div className="upload-section">
      <div className="section-header">
        <div className="title-wrap">
          <div className="section-icon blue">▣</div>
          <div className="section-title">Section 1: Upload Material</div>
        </div>

        <span className="step-text">STEP 1 OF 2</span>
      </div>

      <div className="upload-layout">
        <label className="dropzone">
          <div className="upload-icon">☁</div>

          <h3>Click or drag lecture files</h3>

          <p>
            Supported: PDF, MP4, PPTX, ZIP
            <br />
            (Up to 100MB)
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
          <p className="queue-title">QUEUE ({files.length} FILES)</p>

          {files.map((file) => (
            <UploadedFileCard
              key={file.id}
              file={file}
              onRemove={onRemoveFile}
            />
          ))}
        </div>
      </div>

      <div className="section-footer">
        <button className="delete-all-btn">Delete All</button>
        <button className="confirm-btn">Confirm Upload</button>
      </div>
    </div>
  );
}