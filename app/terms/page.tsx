"use client";
import ScreenTemplate from "@/components/screen-template";

export default function TermsPage() {
  return (
    <ScreenTemplate>
      <div className="prose mx-auto max-w-3xl font-body font-medium px-6 pt-16 pb-32">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="mb-2">
          <strong>Effective date:</strong> September 10, 2025
        </p>
        <p className="mb-10">
          <strong>Last Edited:</strong> October 16, 2025
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
        <p className="mb-8">
          If you purchase a subscription or paid feature, billing is handled by
          Apple, Google, or Stripe depending on the platform. You agree to
          provide accurate payment information and authorize us (or our payment
          providers) to charge you according to your selected plan. We do not
          directly store your full payment details.
        </p>

        <p className="mb-8">
          Payments made through the Apple App Store or Google Play are processed
          by Apple or Google respectively. Payments on our website are processed
          by Stripe. We do not directly process or store your payment
          information, and all refunds for App Store or Google Play purchases
          must be requested through those platforms.
        </p>

        <p className="mb-8">
          Subscriptions renew automatically unless canceled at least 24 hours
          before the end of the current billing period. You can manage or cancel
          your subscription at any time in your App Store or Google Play account
          settings after purchase. Refund requests for App Store or Google Play
          purchases are handled directly by Apple or Google, respectively.
        </p>

        <p className="mb-12">
          Fees are non-refundable except as required by law. For users who
          downloaded Quail from the Apple App Store, these Terms incorporate
          Apple’s standard End User License Agreement (EULA), available at{" "}
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            className="text-primary underline cursor-pointer"
          >
            https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
          </a>
          .
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
          The Service is provided “as is” and “as available,” without warranties
          of any kind, whether express or implied, including but not limited to
          implied warranties of merchantability, fitness for a particular
          purpose, or non-infringement. We do not guarantee that the Service
          will be uninterrupted, secure, or error-free. This disclaimer does not
          affect any rights you may have under applicable consumer-protection
          laws.
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

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Dispute Resolution &amp; Contact
        </h2>
        <p className="mb-12">
          If you have a billing or service dispute, please contact us first at{" "}
          <a
            className="text-primary underline cursor-pointer"
            href="mailto:hello@readquail.com"
          >
            hello@readquail.com
          </a>
          . We aim to resolve issues promptly and fairly before any formal
          action is necessary. Nothing in this section limits your rights to
          pursue remedies available under applicable law.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Governing Law</h2>
        <p className="mb-12">
          These Terms are governed by and construed in accordance with the laws
          of the State of California, United States, without regard to its
          conflict-of-law provisions. Nothing in these Terms limits any rights
          you may have under applicable consumer-protection laws.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Changes to These Terms
        </h2>
        <p className="mb-12">
          We may update these Terms from time to time. Changes are effective
          when posted on this page. We will notify you of material changes via
          the Service or email when appropriate.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Entire Agreement</h2>
        <p className="mb-12">
          These Terms constitute the entire agreement between you and Quail
          regarding your use of the Service and supersede any prior agreements
          or understandings, whether written or oral. If any provision is found
          unenforceable, the remaining provisions remain in full effect.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Operator</h2>
        <p className="mb-12">
          Quail Reader is operated by Quail. For any legal, privacy, or support
          inquiries, contact{" "}
          <a
            className="text-primary underline cursor-pointer"
            href="mailto:hello@readquail.com"
          >
            hello@readquail.com
          </a>
          .
        </p>
      </div>
    </ScreenTemplate>
  );
}
