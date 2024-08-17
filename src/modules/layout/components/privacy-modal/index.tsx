import React from 'react';

type ModalProps = {
  onClose: () => void;
};

const PrivacyPolicyModal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-slate-gray p-6 rounded-lg max-w-3xl w-full mx-4" style={{ overflowY: 'auto', height: '80vh' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-pastel-pink">Privacy Policy</h2>
          <button onClick={onClose} className="text-pastel-pink hover:text-red-500">
            <span className="text-3xl">×</span>
          </button>
        </div>
        <div className="mt-4 text-white text-lg" style={{ whiteSpace: "pre-wrap" }}>
          <strong className="text-xl">1. Introduction</strong>
          <p>Welcome to DeLisa&#39;s Boujee Botanical Store. We value your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and protect your information.</p>

          <strong className="text-xl">2. Information We Collect</strong>
          <p>We collect information that you provide to us directly, such as when you create an account, place an order, or contact us. This information may include your name, email address, phone number, payment information, and any other details you choose to provide.</p>

          <strong className="text-xl">3. How We Use Your Information</strong>
          <p>We use your information to process your orders, manage your account, provide customer service, and improve our services. We may also use your information to communicate with you about updates, promotions, and other relevant information.</p>

          <strong className="text-xl">4. Sharing Your Information</strong>
          <p>We do not share your personal information with third parties except as necessary to process your orders and manage our services. This includes sharing information with payment processors, shipping providers, and other service providers. We do not sell your information to third parties.</p>

          <strong className="text-xl">5. Data Security</strong>
          <p>We implement a variety of security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

          <strong className="text-xl">6. Your Rights</strong>
          <p>You have the right to access, correct, or delete your personal information at any time. You may also opt-out of receiving marketing communications from us. To exercise your rights, please contact us at [Your Contact Information].</p>

          <strong className="text-xl">7. Changes to This Policy</strong>
          <p>We may update this privacy policy from time to time. We encourage you to review this policy periodically to stay informed about how we are protecting your information.</p>

          <strong className="text-xl">8. Contact Us</strong>
          <p>If you have any questions or concerns about this privacy policy, please contact us at [Your Contact Information].</p>
        </div>
        <button onClick={onClose} className="mt-4 bg-pastel-pink hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
