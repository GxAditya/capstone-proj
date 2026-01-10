"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
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
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Terms of Service</h1>
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
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Acceptance of Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing and using the Legal Summarizer platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Description of Service</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Legal Summarizer is an AI-powered platform that helps simplify complex legal documents for startups and entrepreneurs. Our Service includes:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Automated legal document summarization</li>
              <li>Key clause and obligation extraction</li>
              <li>Risk assessment and analysis</li>
              <li>Document storage and management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. User Responsibilities</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              As a user of our Service, you agree to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to interfere with or disrupt the Service</li>
              <li>Not upload malicious content or viruses</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. AI-Generated Content Disclaimer</h2>
            <p className="text-slate-300 leading-relaxed">
              Our Service uses artificial intelligence to analyze and summarize legal documents. While we strive for accuracy, AI-generated summaries are for informational purposes only and should not be considered legal advice. We recommend consulting with qualified legal professionals for important legal decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Intellectual Property</h2>
            <p className="text-slate-300 leading-relaxed">
              All content on this Service, including but not limited to text, graphics, logos, and software, is the property of Legal Summarizer or its content suppliers and is protected by copyright and other intellectual property laws. You retain ownership of any documents you upload to our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Payment and Subscriptions</h2>
            <p className="text-slate-300 leading-relaxed">
              Certain features of the Service may require payment. By providing payment information, you represent that you are authorized to use the payment method. Subscription fees are billed in advance and are non-refundable except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed">
              To the maximum extent permitted by law, Legal Summarizer shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service, including but not limited to reliance on AI-generated summaries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. Termination</h2>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">10. Changes to Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">11. Governing Law</h2>
            <p className="text-slate-300 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">12. Contact Information</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-slate-300">
                <a href="https://github.com/Gov-10/capstone-proj" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
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
