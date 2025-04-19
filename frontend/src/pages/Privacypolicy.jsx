const PrivacyPolicy = () => {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>We only collect email and profile info via Google Sign-In.</li>
          <li>We do not sell or share user data with third parties.</li>
          <li>All data is stored securely in our MongoDB database.</li>
          <li>You can request deletion of your data at any time.</li>
        </ul>
      </div>
    );
  };
  
  export default PrivacyPolicy;
  