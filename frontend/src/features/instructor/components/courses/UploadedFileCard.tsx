import type {
    UploadedMaterial,
  } from "../../types/lectureMaterials.types";
  
  interface Props {
    file: UploadedMaterial;
  
    onRemove: (id: string) => void;
  }
  
  export default function UploadedFileCard({
    file,
  
    onRemove,
  }: Props) {
    return (
      <div className="uploaded-file-card">
  
        <div>
  
          <h4>{file.name}</h4>
  
          <p>
            {file.size} •
            {file.status}
          </p>
  
        </div>
  
        <button
          onClick={() =>
            onRemove(file.id)
          }
        >
          ✕
        </button>
  
      </div>
    );
  }