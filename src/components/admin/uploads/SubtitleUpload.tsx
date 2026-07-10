import React from 'react';
import FileUploadZone from './FileUploadZone';
import { FileText } from 'lucide-react';

interface SubtitleUploadProps {
  folderName?: string;
  onUpload: (url: string, publicId: string) => void;
  onRemove?: () => void;
  currentUrl?: string | null;
  currentPublicId?: string | null;
}

export default function SubtitleUpload(props: SubtitleUploadProps) {
  return (
    <FileUploadZone
      label="Subtitle File"
      icon={FileText}
      accept=".srt,.ass,.vtt,.sub"
      showPreview={false}
      fileType="subtitle"
      {...props}
    />
  );
}
