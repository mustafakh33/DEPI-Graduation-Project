export interface UploadedMaterial {
    id: string;
  
    name: string;
  
    size: string;
  
    progress: number;
  
    status:
      | "uploading"
      | "uploaded";
  
    type:
      | "pdf"
      | "mp4"
      | "pptx"
      | "zip";
  }
  
  export interface UploadMaterialsSectionProps {
    files: UploadedMaterial[];
  
    onSelectFiles: (
      files: FileList | null
    ) => void;
  
    onRemoveFile: (id: string) => void;
  }
  
  export interface UploadQuizSectionProps {
    quizFile: File | null;
  
    onSelectQuizFile: (
      file: File | null
    ) => void;
  }