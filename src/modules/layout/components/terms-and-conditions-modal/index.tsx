import React from 'react';

type ModalProps = {
  onClose: () => void;
};

const TermsAndConditionsModal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-slate-gray p-6 rounded-lg max-w-3xl w-full mx-4" style={{ overflowY: 'auto', height: '80vh' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-pastel-pink">Terms and Conditions</h2>
          <button onClick={onClose} className="text-pastel-pink hover:text-red-500">
            <span className="text-3xl">×</span>
          </button>
        </div>
        <div className="mt-4 text-white text-lg" style={{ whiteSpace: "pre-wrap" }}>
          <strong className="text-xl">1. Introduction</strong>
          <p>Welcome to DeLisa&#39;s Boujee Botanical Store. By accessing our store, you agree to be bound by these terms and conditions. If you do not agree with any part of the terms, you are not permitted to use our services.</p>

          <strong className="text-xl">2. Usage License</strong>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on DeLisa&#39;s Boujee Botanical Store&#39;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc ml-5">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on DeLisa&#39;s Boujee Botanical Store&#39;s website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
          </ul>
          <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by DeLisa&#39;s Boujee Botanical Store at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>

          <strong className="text-xl">3. Disclaimer</strong>
          <p>The materials on DeLisa&#39;s Boujee Botanical Store&#39;s website are provided on an &quot;as is&quot; basis. DeLisa&#39;s Boujee Botanical Store makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <strong className="text-xl">4. Limitations</strong>
          <p>In no event shall DeLisa&#39;s Boujee Botanical Store or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DeLisa&#39;s Boujee Botanical Store&#39;s website, even if DeLisa&#39;s Boujee Botanical Store or a DeLisa&#39;s Boujee Botanical Store authorized representative has been notified orally or in writing of the possibility of such damage.</p>

          <strong className="text-xl">5. Accuracy of Materials</strong>
          <p>The materials appearing on DeLisa&#39;s Boujee Botanical Store&#39;s website could include technical, typographical, or photographic errors. DeLisa&#39;s Boujee Botanical Store does not warrant that any of the materials on its website are accurate, complete, or current. DeLisa&#39;s Boujee Botanical Store may make changes to the materials contained on its website at any time without notice. However, DeLisa&#39;s Boujee Botanical Store does not make any commitment to update the materials.</p>

          <strong className="text-xl">6. Links</strong>
          <p>DeLisa&#39;s Boujee Botanical Store has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DeLisa&#39;s Boujee Botanical Store of the site. Use of any such linked website is at the user&#39;s own risk.</p>

          <strong className="text-xl">7. Modifications</strong>
          <p>DeLisa&#39;s Boujee Botanical Store may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

          <strong className="text-xl">8. Governing Law</strong>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the location of DeLisa&#39;s Boujee Botanical Store and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </div>
        <button onClick={onClose} className="mt-4 bg-pastel-pink hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;