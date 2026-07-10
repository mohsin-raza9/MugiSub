'use client';

import React, { useState } from 'react';
import { PlusCircle, FileText, X } from "lucide-react";
import { deleteFromCloudinary } from '@/utils/upload';
import ImageUpload from './admin/uploads/ImageUpload';
import BannerUpload from './admin/uploads/BannerUpload';
import TrailerUpload from './admin/uploads/TrailerUpload';
import SubtitleUpload from './admin/uploads/SubtitleUpload';

// ================= TYPES & INTERFACES ================= //

export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number' | 'image-upload' | 'banner-upload' | 'trailer-upload' | 'subtitle-upload';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string | number }[]; // For Select dropdowns
  placeholder?: string;
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

export interface EntityConfig {
  id: string;              // e.g., 'movie', 'episode', 'news'
  label: string;           // e.g., 'MOVIE', 'EPISODE'
  icon: React.ElementType; // Lucide Icon
  iconColor?: string;      // Tailwind text color class
  endpoint: string;        // API Route e.g., '/api/admin/anime'
  defaultValues: Record<string, any>;
  sections: FormSection[];
  postSubmitAction?: {
    type: 'ASK_SUBTITLE' | 'ASK_CONFIRMATION';
    message: string;
  };
}

interface UniversalAddModalProps {
  buttonLabel: string;
  configs: EntityConfig[]; // Array of entities you want to create from this button
}

// ================= COMPONENT ================= //

const Form: React.FC<UniversalAddModalProps> = ({ buttonLabel, configs }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<'CHOOSE_TYPE' | 'FORM' | 'POST_ACTION'>('CHOOSE_TYPE');
  const [activeConfig, setActiveConfig] = useState<EntityConfig | null>(null);
  const [payload, setPayload] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field update handler
  const updatePayload = (key: string, value: any) => {
    setPayload(prev => ({ ...prev, [key]: value }));
  };

  // Step 1: Type Select (e.g. Movie, Drama, News)
  const handleChooseType = (config: EntityConfig) => {
    setActiveConfig(config);
    setPayload({ ...config.defaultValues }); // Load default values (e.g. type: 'movie', status: 'Upcoming')
    setStep('FORM');
  };

  // Step 2: Form Submit Intercept
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeConfig?.postSubmitAction) {
      setStep('POST_ACTION');
    } else {
      finalizeFlow(true); // Direct submit
    }
  };

  // Final API Submission
  const finalizeFlow = async (continueNextStep: boolean) => {
    if (!activeConfig) return;
    setIsSubmitting(true);
    try {
      // Add logic if 'continueNextStep' needs to be appended to payload
      const finalPayload = { ...payload, createRelated: continueNextStep };

      const response = await fetch(activeConfig.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) throw new Error('Failed to create record');

      console.log('Created Successfully!');
      handleCloseAndReset();
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to save the record. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel & Cleanup Cloudinary Uploads
  const handleCancel = async () => {
    // DYNAMIC DELETION: Find all keys ending with "PublicId" and delete them
    const publicIdKeys = Object.keys(payload).filter(key => key.endsWith('PublicId'));
    
    for (const key of publicIdKeys) {
      const publicId = payload[key];
      if (publicId) {
        await deleteFromCloudinary(publicId);
        console.log(`Deleted orphan file: ${publicId}`);
      }
    }
    handleCloseAndReset();
  };

  const handleCloseAndReset = () => {
    setIsOpen(false);
    setStep('CHOOSE_TYPE');
    setActiveConfig(null);
    setPayload({});
  };

  // Dynamic Folder Name based on Title or Slug
  const baseName = payload.title || payload.name || payload.slug || 'Untitled';
  const folderName = baseName.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

  // Field Renderer
  const renderField = (field: FormField) => {
    const value = payload[field.name] || '';

    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <div key={field.name} className="w-full">
            <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">{field.label} {field.required && '*'}</label>
            <input 
              required={field.required} type={field.type} value={value} 
              onChange={e => updatePayload(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
              placeholder={field.placeholder || `${field.label}...`} 
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name} className="w-full mt-2">
            <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">{field.label} {field.required && '*'}</label>
            <textarea 
              required={field.required} value={value} onChange={e => updatePayload(field.name, e.target.value)}
              rows={3} className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243] resize-none"
              placeholder={field.placeholder || `${field.label}...`} 
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.name} className="w-full">
            <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">{field.label} {field.required && '*'}</label>
            <select 
              required={field.required} value={value} onChange={e => updatePayload(field.name, e.target.value)}
              className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]">
              {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        );
      
      // MEDIA UPLOADS
      case 'image-upload':
        return <ImageUpload key={field.name} folderName={folderName}
          currentUrl={payload[`${field.name}Url`]} currentPublicId={payload[`${field.name}PublicId`]}
          onUpload={(url, id) => { updatePayload(`${field.name}Url`, url); updatePayload(`${field.name}PublicId`, id); }} 
          onRemove={() => { updatePayload(`${field.name}Url`, null); updatePayload(`${field.name}PublicId`, null); }} />
      case 'banner-upload':
        return <BannerUpload key={field.name} folderName={folderName}
          currentUrl={payload[`${field.name}Url`]} currentPublicId={payload[`${field.name}PublicId`]}
          onUpload={(url, id) => { updatePayload(`${field.name}Url`, url); updatePayload(`${field.name}PublicId`, id); }} 
          onRemove={() => { updatePayload(`${field.name}Url`, null); updatePayload(`${field.name}PublicId`, null); }} />
      case 'trailer-upload':
        return <TrailerUpload key={field.name} folderName={folderName}
          currentUrl={payload[`${field.name}Url`]} currentPublicId={payload[`${field.name}PublicId`]}
          onUpload={(url, id) => { updatePayload(`${field.name}Url`, url); updatePayload(`${field.name}PublicId`, id); }} 
          onRemove={() => { updatePayload(`${field.name}Url`, null); updatePayload(`${field.name}PublicId`, null); }} />
      case 'subtitle-upload':
         return <SubtitleUpload key={field.name} folderName={folderName}
          currentUrl={payload[`${field.name}Url`]} currentPublicId={payload[`${field.name}PublicId`]}
          onUpload={(url, id) => { updatePayload(`${field.name}Url`, url); updatePayload(`${field.name}PublicId`, id); }} 
          onRemove={() => { updatePayload(`${field.name}Url`, null); updatePayload(`${field.name}PublicId`, null); }} />
      
      default: return null;
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className="flex flex-col items-center justify-center p-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white border border-[#7a1515] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full">
        <PlusCircle size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">{buttonLabel}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[550px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span>{step === 'CHOOSE_TYPE' ? 'CHOOSE RECORD TYPE' : `ADD NEW ${activeConfig?.label.toUpperCase()}`}</span>
              <button type="button" onClick={handleCancel} className="hover:text-red-400 font-bold cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar text-left flex-1 min-h-0">
              
              {/* STEP 1: CHOOSE OPTIONS */}
              {step === 'CHOOSE_TYPE' && (
                <div className="grid grid-cols-3 gap-3">
                  {configs.map((config) => {
                    const Icon = config.icon;
                    return (
                      <button key={config.id} onClick={() => handleChooseType(config)} className="flex flex-col items-center justify-center h-24 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group">
                        <Icon size={24} className={`mb-2 group-hover:scale-110 transition-transform ${config.iconColor || 'text-white'}`} />
                        <span className="text-[11px] font-bold font-mono">{config.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* STEP 2: DYNAMIC FORM */}
              {step === 'FORM' && activeConfig && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {activeConfig.sections.map((section, idx) => (
                    <div key={idx} className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                      <span className="text-[9px] font-mono font-bold text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">{section.title}</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* We use full width for textareas, 1 column for others usually. Here we conditionally apply classes based on type */}
                        {section.fields.map(field => (
                           <div key={field.name} className={`${field.type === 'textarea' || field.type.includes('upload') ? 'col-span-full' : ''}`}>
                             {renderField(field)}
                           </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* FORM ACTIONS */}
                  <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                    <button type="button" onClick={handleCancel} className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer">
                      CANCEL
                    </button>
                    <button type="submit" className="flex-1 py-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer">
                      NEXT
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: POST ACTIONS (Subtitles or Confirmation) */}
              {step === 'POST_ACTION' && activeConfig?.postSubmitAction && (
                <div className="space-y-4">
                   
                   {activeConfig.postSubmitAction.type === 'ASK_SUBTITLE' && (
                     <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                        <span className="text-[9px] font-mono font-bold text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">// {activeConfig.postSubmitAction.message}</span>
                        {renderField({ name: 'subtitle', label: 'Subtitle', type: 'subtitle-upload' })}
                     </div>
                   )}

                   {activeConfig.postSubmitAction.type === 'ASK_CONFIRMATION' && (
                     <div className="text-center py-6">
                        <FileText size={48} className="mx-auto mb-4 text-[#34394d]" />
                        <p className="text-[13px] font-bold text-[#222735] font-mono">{activeConfig.postSubmitAction.message}</p>
                     </div>
                   )}
                  
                  <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                    <button type="button" onClick={() => setStep('FORM')} disabled={isSubmitting} className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50">
                      BACK
                    </button>
                    
                    {activeConfig.postSubmitAction.type === 'ASK_CONFIRMATION' && (
                      <button type="button" onClick={() => finalizeFlow(false)} disabled={isSubmitting} className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50">
                        NO
                      </button>
                    )}

                    <button type="button" onClick={() => finalizeFlow(true)} disabled={isSubmitting} className="flex-1 py-1.5 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer disabled:opacity-50">
                      {isSubmitting ? 'SAVING...' : (activeConfig.postSubmitAction.type === 'ASK_CONFIRMATION' ? 'YES' : 'COMMIT_RECORD')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;