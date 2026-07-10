import React from 'react';
import FileUploadZone from './FileUploadZone';
import { Film } from 'lucide-react';

interface TrailerUploadProps {
  folderName?: string;
  onUpload: (url: string, publicId: string) => void;
  onRemove?: () => void;
  currentUrl?: string | null;
  currentPublicId?: string | null;
}

export default function TrailerUpload(props: TrailerUploadProps) {
  return (
    <FileUploadZone
      label="Trailer Video"
      icon={Film}
      accept="video/*"
      showPreview={false}
      fileType="video"
      {...props}
    />
  );
}
