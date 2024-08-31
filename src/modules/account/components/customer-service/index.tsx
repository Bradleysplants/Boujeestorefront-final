"use client";

import { useState } from "react";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item border-b-2 border-pastel-pink py-4">
      <h3
        className="cursor-pointer text-lg font-semibold text-pastel-pink"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
      </h3>
      {isOpen && (
        <p className="mt-2 text-pastel-pink">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "What is the return policy for DeLisa's Boujee Botanical Store?",
      answer:
        "We accept returns or exchanges for products damaged due to our negligence. Please contact us within 48 hours of receiving your order with photographic evidence. Unfortunately, we cannot accept returns for live plants or products damaged by the shipping carrier. For full details, please review our Return Policy."
    },
    {
      question: "What should I do if my order arrives damaged?",
      answer:
        "If your order arrives damaged due to our negligence, contact us within 48 hours with photos of the damage. If the damage occurred during shipping, please file a claim with the shipping carrier."
    },
    {
      question: "Can I return live plants?",
      answer:
        "Due to the nature of live plants, we do not accept returns unless the plant was damaged upon arrival due to our handling errors. We take great care in packaging to ensure your plants arrive in the best condition possible."
    },
    {
      question: "How do I initiate a return?",
      answer:
        "To initiate a return, contact our customer service with your order number, a description of the issue, and supporting photos. Do not send the product back without our authorization. If your return is approved, we will provide you with detailed instructions, if applicable."
    },
    {
      question: "What is the warranty on your plants and products?",
      answer:
        "We do not offer a specific warranty on our plants or products. However, we guarantee that our plants will arrive healthy and as described. If there is an issue due to our negligence, we will work with you to find a satisfactory solution."
    },
    {
      question: "How can I contact customer service?",
      answer:
        "You can contact our customer service team via email at delisasboujeebotanicalstore@gmail.com or by phone at [Your Business Phone Number]. We are here to help with any questions or concerns you may have."
    },
    {
      question: "Can I cancel or modify my order?",
      answer:
        "If you need to cancel or modify your order, please contact us as soon as possible. Once an order has been processed or shipped, we may not be able to accommodate changes."
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we only ship within the US. We are working on expanding our shipping options in the future."
    },
    {
      question: "How do you handle personal data and privacy?",
      answer:
        "We take your privacy seriously. For details on how we handle personal data, please refer to our Privacy Policy."
    },
    {
      question: "What if my package is stolen or lost?",
      answer:
        "We recommend arranging delivery at a time when you or someone else can receive the package directly. We are not responsible for any damage or theft that occurs if the package is left unattended after delivery. If the package is lost, please contact the shipping carrier to file a claim."
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-pastel-pink mb-8">
        Customer Service &amp; FAQ
      </h1>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-pastel-pink mb-4">Contact Us</h2>
        <p className="text-pastel-pink">
          If you have any further questions or need assistance, please don&#39;t hesitate to reach out to us. Our customer service team is here to help.
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-pastel-pink">Email:</h3>
          <p className="text-pastel-pink">
            <a href="mailto:support@delisasboujeebotanicalstore.com" className="text-pastel-pink hover:underline">
              delisasboujeebotanicalstore@gmail.com
            </a>
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-pastel-pink">Phone:</h3>
          <p className="text-pastel-pink">
            [Your Business Phone Number]
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-pastel-pink">Address:</h3>
          <p className="text-pastel-pink">
            251 Hillsboro Circle
            New Market, Al. 35761
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
