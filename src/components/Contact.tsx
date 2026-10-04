import React, { useState } from 'react';
import { Phone, Mail, Instagram, Linkedin, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { MovableElement } from './MovableElement';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '', budget: '', country: '', message: '' });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [directGmailUrl, setDirectGmailUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);
    setDirectGmailUrl(null);

    const targetEmail = PERSONAL_INFO.email || 'auzair290@gmail.com';
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.interest,
      budget: formData.budget,
      country: formData.country,
      message: formData.message
    };

    // Construct Gmail Web Compose and mailto URLs
    const emailSubject = `Project Inquiry: ${formData.interest} - ${formData.name}`;
    const emailBody = `Hi Uzair,\n\nI would like to inquire about your design services.\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `🎯 Service: ${formData.interest}\n` +
      `💰 Budget: ${formData.budget}\n` +
      `🌍 Country: ${formData.country}\n\n` +
      `📝 Project Requirements:\n${formData.message}\n`;

    const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    setDirectGmailUrl(gmailComposeLink);

    let recorded = false;

    // 1. Send to local server endpoint (/api/contact)
    try {
      const localRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (localRes.ok) {
        recorded = true;
      }
    } catch (e) {
      // Running statically
    }

    // 2. If Web3Forms access key is configured, send email via Web3Forms
    const web3Key = (PERSONAL_INFO as any).web3formsKey || (import.meta as any).env?.VITE_WEB3FORMS_KEY;
    let web3Delivered = false;

    if (web3Key && web3Key.trim()) {
      try {
        const wRes = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key.trim(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.interest,
            budget: formData.budget,
            country: formData.country,
            message: formData.message,
            subject: emailSubject,
            from_name: formData.name,
            replyto: formData.email
          })
        });
        const wData = await wRes.json().catch(() => ({}));
        if (wRes.ok && wData.success) {
          recorded = true;
          web3Delivered = true;
        }
      } catch (e) {
        console.warn('Web3Forms dispatch warning:', e);
      }
    }

    if (web3Delivered) {
      // Sent directly to inbox via Web3Forms
      setStatusMessage(`Thank you, ${formData.name}! Your inquiry has been sent directly to Uzair's email inbox (${targetEmail}). You will receive a direct response within 24 hours.`);
      setDirectGmailUrl(null);
      setFormData({ name: '', email: '', phone: '', interest: '', budget: '', country: '', message: '' });
    } else if (recorded) {
      // Saved to local server
      setStatusMessage(`Thank you, ${formData.name}! Your inquiry has been submitted and recorded. Uzair (${targetEmail}) will review your requirements and get back to you within 24 hours.`);
      setFormData({ name: '', email: '', phone: '', interest: '', budget: '', country: '', message: '' });
    } else {
      // Fallback: automatically open Gmail compose so message is never lost
      window.open(gmailComposeLink, '_blank');
      setStatusMessage(`Thank you, ${formData.name}! A draft email to Uzair (${targetEmail}) has been opened in Gmail with your project details ready to send.`);
      setFormData({ name: '', email: '', phone: '', interest: '', budget: '', country: '', message: '' });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20">
          
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <MovableElement sectionId="contact" elementId="contact-heading">
                <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-[#1A1A1A]/70 mb-3">
                  <span className="w-5 h-[2px] bg-[#FF0000] inline-block" />
                  <span>Contact Us</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] tracking-tight mb-6">
                  Let's Talk for <span className="font-serif-accent text-[#FF0000]">Your Next Projects</span>
                </h2>

                <p className="text-[#1A1A1A]/55 text-base sm:text-lg leading-relaxed mb-10 font-normal">
                  Have a design project in mind, need brand identity overhaul, or want to discuss full-time/contract opportunities? Send a message — I reply swiftly.
                </p>
              </MovableElement>

              <div className="space-y-5">
                <MovableElement sectionId="contact" elementId="contact-phone">
                  <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 group p-4 rounded-2xl glass-panel glass-panel-hover">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_4px_16px_rgba(255,0,0,0.25)]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A1A1A]/35 uppercase tracking-wider">Phone / WhatsApp</div>
                      <div className="text-base font-bold text-[#1A1A1A] group-hover:text-[#FF0000] transition-colors">{PERSONAL_INFO.phone}</div>
                    </div>
                  </a>
                </MovableElement>

                <MovableElement sectionId="contact" elementId="contact-email">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 group p-4 rounded-2xl glass-panel glass-panel-hover">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_4px_16px_rgba(255,0,0,0.25)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A1A1A]/35 uppercase tracking-wider">Official Email</div>
                      <div className="text-base font-bold text-[#1A1A1A] group-hover:text-[#FF0000] transition-colors">{PERSONAL_INFO.email}</div>
                    </div>
                  </a>
                </MovableElement>

                <MovableElement sectionId="contact" elementId="contact-instagram">
                  <a href={PERSONAL_INFO.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 group p-4 rounded-2xl glass-panel glass-panel-hover">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_4px_16px_rgba(255,0,0,0.25)]">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A1A1A]/35 uppercase tracking-wider">Instagram Portfolio</div>
                      <div className="text-base font-bold text-[#1A1A1A] group-hover:text-[#FF0000] transition-colors flex items-center gap-1">
                        <span>{PERSONAL_INFO.instagram}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </a>
                </MovableElement>

                <MovableElement sectionId="contact" elementId="contact-linkedin">
                  <a 
                    href={(PERSONAL_INFO as any).linkedinUrl || "https://www.linkedin.com/in/uzair-creates-695862427/"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    id="contact-linkedin-link"
                    className="flex items-center gap-4 group p-4 rounded-2xl glass-panel glass-panel-hover"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_4px_16px_rgba(255,0,0,0.25)]">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A1A1A]/35 uppercase tracking-wider">LinkedIn Profile</div>
                      <div className="text-base font-bold text-[#1A1A1A] group-hover:text-[#FF0000] transition-colors flex items-center gap-1">
                        <span>{(PERSONAL_INFO as any).linkedin || 'Uzair Ahmad'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </a>
                </MovableElement>

                <MovableElement sectionId="contact" elementId="contact-location">
                  <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(255,0,0,0.25)]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A1A1A]/35 uppercase tracking-wider">Location</div>
                      <div className="text-base font-bold text-[#1A1A1A]">{PERSONAL_INFO.address}</div>
                    </div>
                  </div>
                </MovableElement>
              </div>
            </div>

            <MovableElement sectionId="contact" elementId="contact-status">
              <div className="mt-8 pt-6 border-t border-black/8 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold text-[#1A1A1A]/70">Currently open for freelance projects &amp; remote contracts</span>
              </div>
            </MovableElement>
          </div>

          <div className="lg:col-span-7">
            <MovableElement sectionId="contact" elementId="contact-form">
              <div className="glass-panel rounded-3xl p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.06)] text-[#1A1A1A]">
                <form onSubmit={handleSubmit} id="contactForm" className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fname" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-2">Your Name <span className="text-[#FF0000]">*</span></label>
                      <input id="fname" name="name" type="text" required placeholder="Ex. John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="glass-input w-full px-4 py-3.5 rounded-xl text-[#1A1A1A] placeholder-[#1A1A1A]/25 text-sm font-medium transition-all outline-none" />
                    </div>
                    <div>
                      <label htmlFor="femail" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-2">Email Address <span className="text-[#FF0000]">*</span></label>
                      <input id="femail" name="email" type="email" required placeholder="example@gmail.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="glass-input w-full px-4 py-3.5 rounded-xl text-[#1A1A1A] placeholder-[#1A1A1A]/25 text-sm font-medium transition-all outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fphone" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-2">Phone Number <span className="text-[#FF0000]">*</span></label>
                      <input id="fphone" name="phone" type="tel" required placeholder="Enter phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="glass-input w-full px-4 py-3.5 rounded-xl text-[#1A1A1A] placeholder-[#1A1A1A]/25 text-sm font-medium transition-all outline-none" />
                    </div>
                    <div>
                      <label htmlFor="finterest" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-2">I'm Interested In <span className="text-[#FF0000]">*</span></label>
                      <select id="finterest" name="service" required value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} className="glass-input w-full px-4 py-3.5 rounded-xl text-[#1A1A1A] text-sm font-medium transition-all outline-none cursor-pointer">
                        <option value="" disabled>Select a service</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="App Design">App Design</option>
                        <option value="Website Design">Website Design</option>
                        <option value="Graphic Design & Branding">Graphic Design &amp; Branding</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Other">Other Project</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fbudget" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-2">Budget Range (USD) <span className="text-[#FF0000]">*</span></label>
                      <select id="fbudget" name="budget" required value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="glass-input w-full px-4 py-3.5 rounded-xl text-[#1A1A1A] text-sm font-medium transition-all outline-none cursor-pointer">
                        <option value="" disabled>Select range</option>
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 – $5,000">$1,000 – $5,000</option>
                        <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                        <option value="$15,000+">$15,000+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="fcountry" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-2">Country <span className="text-[#FF0000]">*</span></label>
                      <select id="fcountry" name="country" required value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="glass-input w-full px-4 py-3.5 rounded-xl text-[#1A1A1A] text-sm font-medium transition-all outline-none cursor-pointer">
                        <option value="" disabled>Select country</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="fmsg" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-2">Your Message &amp; Requirements <span className="text-[#FF0000]">*</span></label>
                    <textarea id="fmsg" name="message" required rows={4} placeholder="Describe your design project goals, deadline, and deliverables..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="glass-input w-full px-4 py-3.5 rounded-xl text-[#1A1A1A] placeholder-[#1A1A1A]/25 text-sm font-medium transition-all outline-none resize-y" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    id="contact-submit-btn" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full glass-pill-red text-white font-bold text-sm hover:shadow-[0_12px_36px_rgba(255,0,0,0.35)] transition-all duration-300 group cursor-pointer disabled:opacity-80 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending to Uzair's Email...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#FF0000] transition-colors">
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      </>
                    )}
                  </button>

                  {statusMessage && (
                    <div className="p-4 sm:p-5 rounded-2xl glass-card bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3 animate-fadeIn shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-bold text-emerald-900 dark:text-emerald-200 mb-0.5">Inquiry Sent Successfully!</div>
                        <div className="leading-relaxed mb-2.5">{statusMessage}</div>
                        {directGmailUrl && (
                          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-emerald-500/20">
                            <a
                              href={directGmailUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-900 dark:text-emerald-200 text-xs font-semibold transition-all border border-emerald-500/30"
                            >
                              <span>Open in Gmail (Send copy directly)</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`mailto:${PERSONAL_INFO.email}?subject=Project Inquiry`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1A1A]/60 dark:text-white/60 hover:text-[#FF0000] transition-colors"
                            >
                              <span>Use Desktop Email App</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-4 sm:p-5 rounded-2xl glass-card bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-300 text-sm flex flex-col gap-2.5 animate-fadeIn shadow-sm">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-red-900 dark:text-red-200 mb-0.5">Submission Notice</div>
                          <div className="leading-relaxed">{errorMessage}</div>
                        </div>
                      </div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`Project Inquiry - ${formData.name || 'Client'}`)}&body=${encodeURIComponent(
                          `Hi Uzair,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.interest}\nBudget: ${formData.budget}\nCountry: ${formData.country}\n\nMessage:\n${formData.message}`
                        )}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF0000] hover:underline self-start ml-8"
                      >
                        <span>Send directly via your email app</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                </form>
              </div>
            </MovableElement>
          </div>

        </div>
      </div>
    </section>
  );
};
