import React from 'react';
import FileUploadZone from './FileUploadZone';
import { Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  folderName?: string;
  onUpload: (url: string, publicId: string) => void;
  onRemove?: () => void;
  currentUrl?: string | null;
  currentPublicId?: string | null;
}

export default function ImageUpload(props: ImageUploadProps) {
  return (
    <FileUploadZone
      label="Poster Image *"
      icon={ImageIcon}
      accept="image/*"
      showPreview={true}
      fileType="image"
      {...props}
    />
  );
}
