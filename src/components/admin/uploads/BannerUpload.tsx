import React from 'react';
import FileUploadZone from './FileUploadZone';
import { MonitorPlay } from 'lucide-react';

interface BannerUploadProps {
  folderName?: string;
  onUpload: (url: string, publicId: string) => void;
  onRemove?: () => void;
  currentUrl?: string | null;
  currentPublicId?: string | null;
}

export default function BannerUpload(props: BannerUploadProps) {
  return (
    <FileUploadZone
      label="Banner Image"
      icon={MonitorPlay}
      accept="image/*"
      showPreview={true}
      fileType="image"
      {...props}
    />
  );
}
