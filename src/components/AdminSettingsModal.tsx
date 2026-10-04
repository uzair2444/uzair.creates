import React, { useState, useEffect } from 'react';
import { X, Save, RefreshCw, Layers, User, Check, AlertCircle, Mail, Clock, Phone, MapPin } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import initialContent from '../siteContent.json';

interface SiteContent {
  name: string;
  title: string;
  tagline: string;
  heroBio?: string;
  age: number;
  location: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  linkedin?: string;
  linkedinUrl?: string;
  web3formsKey?: string;
  bio: string;
}

export const AdminSettingsModal: React.FC = () => {
  const { 
    isSettingsModalOpen, 
    closeSettingsModal, 
    sectionOrder, 
    moveSection, 
    resetAllToCode,
    publishWebsite,
    saveStatus 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'content' | 'layout' | 'inquiries'>('content');
  const [content, setContent] = useState<SiteContent>(initialContent as SiteContent);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch current live content and inquiries from server when opened
  useEffect(() => {
    if (isSettingsModalOpen) {
      fetch('/api/content')
        .then(res => res.json())
        .then(data => {
          if (data && Object.keys(data).length > 0) {
            setContent(prev => ({ ...prev, ...data }));
          }
        })
        .catch(() => {
          // fallback to bundled initialContent
        });

      fetch('/api/inquiries')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setInquiries(data);
          }
        })
        .catch(() => {});
    }
  }, [isSettingsModalOpen]);

  if (!isSettingsModalOpen) return null;

  const handleInputChange = (field: keyof SiteContent, value: string | number) => {
    setContent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAndPublish = async () => {
    setIsSaving(true);
    setStatusMessage('Saving to source files (src/siteContent.json & src/positions.json)...');

    try {
      // 1. Save content to src/siteContent.json
      const contentRes = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!contentRes.ok) throw new Error('Failed to save content');

      // 2. Publish and build dist/
      setStatusMessage('Publishing and compiling to dist/...');
      const publishOk = await publishWebsite();

      if (publishOk) {
        setStatusMessage('✓ Saved to source files & published! All viewers will see the updates.');
        setTimeout(() => {
          setStatusMessage(null);
          // Reload page to reflect new content in React runtime if needed
          window.location.reload();
        }, 1200);
      } else {
        setStatusMessage('Content saved to source files. Background build started.');
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message || 'Could not save'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#12141A]/95 border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#FF0000]/20 border border-[#FF0000]/40 flex items-center justify-center text-[#FF0000]">
              ⚙️
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">Admin Mode & Site Settings</h2>
              <p className="text-xs text-white/50">Changes save directly into main source code files (`src/`) & `dist/`</p>
            </div>
          </div>
          <button 
            onClick={closeSettingsModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'border-[#FF0000] text-white font-semibold'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <User className="w-4 h-4" />
            Personal & Profile Info
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'layout'
                ? 'border-[#FF0000] text-white font-semibold'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            Section Order & Layout
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-[#FF0000] text-white font-semibold'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Mail className="w-4 h-4" />
            Inquiries Inbox
            {inquiries.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF0000] text-white">
                {inquiries.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={content.name || ''}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Professional Title</label>
                  <input
                    type="text"
                    value={content.title || ''}
                    onChange={e => handleInputChange('title', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Tagline / Subheading</label>
                <input
                  type="text"
                  value={content.tagline || ''}
                  onChange={e => handleInputChange('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={content.email || ''}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={content.phone || ''}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={content.location || ''}
                    onChange={e => handleInputChange('location', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Instagram Handle</label>
                  <input
                    type="text"
                    value={content.instagram || ''}
                    onChange={e => handleInputChange('instagram', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={content.linkedinUrl || ''}
                  onChange={e => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-white/70">Web3Forms Access Key (For Auto-Emailing Inquiries)</label>
                  <a 
                    href="https://web3forms.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[11px] text-[#FF0000] hover:underline font-semibold"
                  >
                    Get free key at web3forms.com ↗
                  </a>
                </div>
                <input
                  type="text"
                  value={content.web3formsKey || ''}
                  onChange={e => handleInputChange('web3formsKey', e.target.value)}
                  placeholder="e.g. 12345678-abcd-1234-abcd-1234567890ab"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm font-mono"
                />
                <p className="text-[11px] text-white/40 mt-1">
                  Optional: Add your free Web3Forms key to automatically forward all client submissions directly to your email ({content.email || 'auzair290@gmail.com'}).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Hero Section Tagline / Description (Unique)</label>
                <textarea
                  rows={2}
                  value={content.heroBio || ''}
                  onChange={e => handleInputChange('heroBio', e.target.value)}
                  placeholder="Unique statement for the hero section..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">About Section Bio & Summary</label>
                <textarea
                  rows={3}
                  value={content.bio || ''}
                  onChange={e => handleInputChange('bio', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-4">
              <p className="text-xs text-white/60">
                Reorder the sections of the webpage. The order is automatically saved into <code className="text-amber-400 bg-white/5 px-1 py-0.5 rounded">src/positions.json</code>.
              </p>

              <div className="space-y-2">
                {sectionOrder.map((sectionId, idx) => (
                  <div 
                    key={sectionId} 
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/10 text-xs flex items-center justify-center font-bold text-white/70">
                        {idx + 1}
                      </span>
                      <span className="capitalize font-semibold text-white tracking-wide">
                        {sectionId}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveSection(sectionId, 'up')}
                        disabled={idx === 0}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold text-white transition-all cursor-pointer"
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveSection(sectionId, 'down')}
                        disabled={idx === sectionOrder.length - 1}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold text-white transition-all cursor-pointer"
                        title="Move Down"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={resetAllToCode}
                  className="inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset all section order & element offsets to defaults
                </button>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h3 className="font-bold text-white text-base">Client Inquiries ({inquiries.length})</h3>
                  <p className="text-xs text-white/50">All project inquiries submitted from the website are recorded here.</p>
                </div>
                <button
                  onClick={() => {
                    fetch('/api/inquiries')
                      .then(res => res.json())
                      .then(data => Array.isArray(data) && setInquiries(data));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <Mail className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60 font-medium">No inquiries received yet.</p>
                  <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">
                    When visitors fill out the contact form and submit an inquiry, it will instantly show up here and deliver to your email.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq: any, i: number) => (
                    <div key={inq.id || i} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{inq.name || inq['Client Name'] || 'Anonymous'}</span>
                          {(inq.service || inq['Selected Service']) && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30">
                              {inq.service || inq['Selected Service']}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-white/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {inq.formattedDate || inq.date || 'Recent'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                        {(inq.email || inq['Client Email']) && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3.5 h-3.5 text-white/40 shrink-0" />
                            <a href={`mailto:${inq.email || inq['Client Email']}`} className="text-[#FF0000] hover:underline truncate">
                              {inq.email || inq['Client Email']}
                            </a>
                          </div>
                        )}
                        {(inq.phone || inq['Client Phone']) && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Phone className="w-3.5 h-3.5 text-white/40 shrink-0" />
                            <span>{inq.phone || inq['Client Phone']}</span>
                          </div>
                        )}
                        {(inq.budget || inq['Budget Range']) && (
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-white/40">💰 Budget:</span>
                            <span className="text-white font-medium">{inq.budget || inq['Budget Range']}</span>
                          </div>
                        )}
                        {(inq.country || inq['Country']) && (
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0" />
                            <span>{inq.country || inq['Country']}</span>
                          </div>
                        )}
                      </div>

                      {(inq.message || inq['Message & Requirements']) && (
                        <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-white/80 whitespace-pre-wrap leading-relaxed">
                          {inq.message || inq['Message & Requirements']}
                        </div>
                      )}

                      {(inq.email || inq['Client Email']) && (
                        <div className="pt-1 flex justify-end">
                          <a
                            href={`mailto:${inq.email || inq['Client Email']}?subject=${encodeURIComponent(`Re: Project Inquiry - ${inq.service || 'Design Services'}`)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF0000] hover:bg-[#D60000] text-white text-xs font-bold transition-all shadow-sm"
                          >
                            <span>Reply to Client</span>
                            ↗
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status bar */}
        {statusMessage && (
          <div className="px-6 py-2.5 bg-white/[0.04] border-t border-white/10 text-xs flex items-center gap-2 text-amber-300">
            {statusMessage.startsWith('✓') ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : statusMessage.startsWith('Error') ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="text-xs text-white/50">
            Targets: <span className="text-emerald-400 font-mono">src/</span> + <span className="text-emerald-400 font-mono">dist/</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={closeSettingsModal}
              className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSaveAndPublish}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#D60000] text-white text-sm font-bold shadow-[0_4px_16px_rgba(255,0,0,0.35)] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving & Publishing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save to Source & Publish
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
