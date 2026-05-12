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
  
        <div className="section-title">
          Section 1:
          Upload Material
        </div>
  
        <div className="upload-layout">
  
          <div className="dropzone">
  
            <div className="upload-icon">
              ⬆
            </div>
  
            <h3>
              Click or drag lecture files
            </h3>
  
            <p>
              Supported:
              PDF, MP4, PPTX, ZIP
            </p>
  
            <input
              type="file"
              multiple
              accept=".pdf,.mp4,.pptx,.zip"
              onChange={(e) =>
                onSelectFiles(
                  e.target.files
                )
              }
            />
  
          </div>
  
          <div className="uploaded-files">
  
            {files.map((file) => (
              <UploadedFileCard
                key={file.id}
                file={file}
                onRemove={
                  onRemoveFile
                }
              />
            ))}
  
          </div>
  
        </div>
  
      </div>
    );
  }