const AccessibilityStatement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-gray">
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-6">
        <div className="max-w-4xl w-full bg-darker-slate-gray p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-pastel-pink mb-6 text-center">
            Accessibility Statement
          </h1>
          <p className="text-pastel-pink mb-4">
            At DeLisa&apos;s Boujee Botanical Store, we are committed to ensuring that our website is accessible to everyone, including individuals with disabilities. We are constantly working to improve the accessibility of our website to provide an inclusive and seamless experience for all our customers.
          </p>
          <p className="text-pastel-pink mb-4">
            We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, as established by the World Wide Web Consortium (W3C). These guidelines help make web content more accessible to a wider range of people with disabilities, including those with visual, auditory, cognitive, and motor impairments.
          </p>
          <p className="text-pastel-pink mb-4">
            If you experience any difficulty in accessing any part of our website, please feel free to contact us. We welcome your feedback and are committed to addressing any accessibility barriers.
          </p>
          <p className="text-pastel-pink mb-4">
            For assistance or to report an accessibility issue, please contact us at:
          </p>
          <ul className="text-pastel-pink mb-4 list-disc pl-6">
            <li>Email: <a href="mailto:delisasboujeebotanical.store" className="text-primary-green hover:underline">support@boujee-botanical.store</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-primary-green hover:underline">+1 (234) 567-890</a></li>
            <li>Mailing Address: 251 Hillsboro Circle New Market, Al. 35761</li>
          </ul>
          <p className="text-pastel-pink">
            Thank you for visiting DeLisa&apos;s Boujee Botanical Store. We appreciate your support and are committed to ensuring a positive shopping experience for all.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AccessibilityStatement;
