import React from 'react';

type ModalProps = {
  onClose: () => void;
};

const ReturnPolicyModal = ({ onClose }: ModalProps) => {
  // Function to handle clicks on the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center" 
      aria-modal="true" 
      role="dialog"
      onClick={handleBackdropClick} // Listen for clicks on the backdrop
    >
      <div className="bg-slate-gray p-6 rounded-lg max-w-3xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 max-h-[calc(90vh-20px)] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-pastel-pink ">Return Policy</h2>
          <button onClick={onClose} className="text-pastel-pink hover:text-primary-green">
            <span className="text-2xl sm:text-3xl">×</span>
          </button>
        </div>
        <div className="mt-4 text-white text-base sm:text-lg">
          <strong>Return Policy for DeLisa&apos;s Boujee Botanical Store</strong>
          <p>At DeLisa&apos;s Boujee Botanical Store, we take pride in the quality and condition of our plants and products. However, we understand that issues can arise. Please review our return policy below:</p>

          <strong>Returns Due to Our Negligence</strong>
          <p>If you receive a product that is damaged due to our negligence, we are more than willing to accommodate a return or exchange. Please contact us within 48 hours of receiving your order with photographic evidence of the damage. After review, we will arrange a return or exchange for the damaged item at no additional cost to you.</p>

          <strong>Exclusions</strong>
          <ul className="list-disc ml-6">
            <li><strong>Carrier Damage:</strong> If the damage is caused by the shipping carrier, please file a claim directly with them. DeLisa&apos;s Boujee Botanical Store is not responsible for damages incurred during shipping.</li>
            <li><strong>Unattended Parcels:</strong> We are not responsible for any damage or theft that occurs if the package is left unattended after delivery. We recommend arranging a delivery time when you or someone else can receive the parcel directly.</li>
            <li><strong>Live Plants:</strong> Due to the nature of live plants, we do not accept returns based on factors beyond our control, such as plant performance or growth differences unless the plant was already damaged upon arrival due to our packing or handling errors.</li>
          </ul>

          <strong>Steps to Initiate a Return</strong>
          <p>Contact us with your order number, the description of the issue, and supporting photographs. Do not send your product back without authorization from our customer service team. Once your claim is validated, we will provide detailed instructions and, if applicable, a prepaid shipping label.</p>

          <strong>Contact Information</strong>
          <p>For any questions regarding our return policy, please contact us via email at delisasboujeebotanicals@gmail.com or phone at [Your Business Phone Number].</p>
        </div>
        <button onClick={onClose} className="mt-4 bg-pastel-pink hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ReturnPolicyModal;
