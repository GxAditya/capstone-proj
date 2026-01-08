"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-600/20 rounded-xl">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <p className="text-slate-400 mt-1">Last updated: January 8, 2026</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 space-y-8"
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              Legal Summarizer ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our legal document analysis platform. Please read this privacy policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-blue-300">2.1 Personal Information</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              We may collect personal information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mb-4">
              <li>Name and email address</li>
              <li>Account credentials (username and password)</li>
              <li>Company or organization name</li>
              <li>Payment information (processed securely by third-party providers)</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-blue-300">2.2 Document Data</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              When you upload documents to our Service, we collect and process:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mb-4">
              <li>Document content and metadata</li>
              <li>AI-generated summaries and analysis</li>
              <li>Document upload history</li>
              <li>User annotations and notes</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-blue-300">2.3 Automatically Collected Information</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              We automatically collect certain information when you use our Service:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage patterns and preferences</li>
              <li>Log data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">3. How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process document analysis and generate AI summaries</li>
              <li>Manage your account and provide customer support</li>
              <li>Send administrative information and updates</li>
              <li>Process payments and prevent fraud</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Comply with legal obligations</li>
              <li>Protect the security and integrity of our Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">4. Data Storage and Security</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mb-4">
              <li>End-to-end encryption for data transmission</li>
              <li>Encrypted storage of sensitive information</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication protocols</li>
              <li>Secure cloud infrastructure (AWS/Google Cloud)</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Your documents are stored securely on our servers and are only accessible by you and our AI processing systems. We do not share your documents with third parties for any purpose other than providing the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">5. Information Sharing and Disclosure</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We do not sell or rent your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., payment processing, cloud hosting)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users or others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">6. Data Retention</h2>
            <p className="text-slate-300 leading-relaxed">
              We retain your personal information for as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy. You may request deletion of your account and data at any time. Upon deletion, we will remove your data within 30 days, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">7. Your Privacy Rights</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@legalsummarizer.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">8. Cookies and Tracking Technologies</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for the Service to function</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              You can control cookies through your browser settings, but disabling certain cookies may limit functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">9. Third-Party Services</h2>
            <p className="text-slate-300 leading-relaxed">
              Our Service may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">10. Children's Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">11. International Data Transfers</h2>
            <p className="text-slate-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">12. Changes to This Privacy Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">13. GDPR Compliance</h2>
            <p className="text-slate-300 leading-relaxed">
              If you are in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). We process your data based on legitimate interests, consent, or contractual necessity. You have additional rights under GDPR, including the right to lodge a complaint with a supervisory authority.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">14. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-slate-300">
                <a href="https://github.com/Gov-10/capstone-proj" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 hover:underline">
                  https://github.com/Gov-10/capstone-proj
                </a>
              </p>
            </div>
          </section>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-slate-500 text-sm"
        >
          <p>© 2026 Legal Summarizer. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
