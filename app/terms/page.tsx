"use client";
import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";

export default function TermsPage() {
  return (
    <main className="bg-background text-text">
      <Navbar />

      <div className="prose mx-auto max-w-3xl font-body font-medium px-6 pt-16 pb-32">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="mb-10">
          <strong>Effective date:</strong> September 18, 2025
        </p>

        <p className="mb-12">
          Welcome to Quail Reader (“Quail,” “we,” “us,” or “our”). These Terms
          of Service (“Terms”) govern your access to and use of our website at{" "}
          <a href="https://readquail.com" className="text-primary underline">
            readquail.com
          </a>
          , our mobile apps, and related services (collectively, the “Service”).
          By using the Service, you agree to these Terms. If you do not agree,
          do not use the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Eligibility</h2>
        <p className="mb-12">
          You must be at least 13 years old (or the minimum legal age in your
          jurisdiction) to use the Service. By using Quail, you represent that
          you meet these requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Accounts &amp; Security
        </h2>
        <ul className="list-disc pl-6 mb-12 space-y-2">
          <li>
            You are responsible for maintaining the confidentiality of your
            account and password.
          </li>
          <li>
            You agree to notify us immediately of any unauthorized use of your
            account.
          </li>
          <li>
            We are not liable for losses caused by unauthorized use of your
            account.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Acceptable Use</h2>
        <ul className="list-disc pl-6 mb-12 space-y-2">
          <li>
            Do not use the Service for unlawful, harmful, or abusive activity.
          </li>
          <li>Do not interfere with or disrupt the Service or its servers.</li>
          <li>
            Do not attempt to gain unauthorized access to other accounts or
            data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Subscriptions &amp; Payments
        </h2>
        <p className="mb-12">
          If you purchase a subscription or paid feature, billing is handled by
          Stripe. You agree to provide accurate payment information and
          authorize us (through Stripe) to charge you according to your selected
          plan. Fees are non-refundable except as required by law.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Intellectual Property
        </h2>
        <p className="mb-12">
          The Service, including content, software, and trademarks, is owned by
          Quail or its licensors. You may not copy, modify, distribute, or
          create derivative works without our prior written consent.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Termination</h2>
        <p className="mb-12">
          We may suspend or terminate your access if you violate these Terms or
          use the Service in a way that could harm us, other users, or third
          parties. You may stop using the Service at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Disclaimers</h2>
        <p className="mb-12">
          The Service is provided “as is” without warranties of any kind. We do
          not guarantee the Service will be uninterrupted, secure, or
          error-free.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Limitation of Liability
        </h2>
        <p className="mb-12">
          To the fullest extent permitted by law, Quail is not liable for
          indirect, incidental, or consequential damages arising from your use
          of the Service. Our total liability for any claim is limited to the
          amount you paid us in the past 12 months.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Governing Law</h2>
        <p className="mb-12">
          These Terms are governed by the laws of your jurisdiction without
          regard to conflict-of-law provisions. Disputes shall be resolved in
          the courts of that jurisdiction.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Changes to These Terms
        </h2>
        <p className="mb-12">
          We may update these Terms from time to time. Changes are effective
          when posted on this page. We will notify you of material changes via
          the Service or email when appropriate.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Contact</h2>
        <p className="mb-12">
          Questions about these Terms? Email us at{" "}
          <a
            className="text-primary underline cursor-pointer"
            href="mailto:hello@readquail.com"
          >
            hello@readquail.com
          </a>
          .
        </p>
      </div>

      <Footer />
    </main>
  );
}
