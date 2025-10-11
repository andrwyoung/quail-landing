"use client";
import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";

export default function PrivacyPage() {
  return (
    <main className="bg-background text-text">
      <Navbar />

      <div className="prose mx-auto max-w-3xl font-body font-medium px-6 pt-16 pb-32">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="mb-10">
          <strong>Effective date:</strong> September 10, 2025
        </p>

        <p className="mb-12">
          Quail Reader (“we”, “us”, “our”) respects your privacy. This policy
          explains what we collect, how we use it, and the choices you have. It
          applies to our website at{" "}
          <a
            href="https://readquail.com"
            className="text-primary underline cursor-pointer"
          >
            readquail.com
          </a>
          , our mobile apps, and related services (collectively, the “Service”).
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Information We Collect
        </h2>
        <ul className="list-disc pl-6 mb-12 space-y-2">
          <li>
            <strong>Account information:</strong> email address and (if you
            choose) your name, typically provided via Apple or Google Sign-In.
          </li>
          <li>
            <strong>Usage and device logs:</strong> IP address, browser/app
            details, timestamps, referring pages, and basic diagnostics for
            security, analytics, and operations.
          </li>
          <li>
            <strong>Payment information:</strong> Payments are processed by
            Stripe. We receive limited billing metadata (e.g., subscription
            tier, status) but <em>we do not store full card numbers</em>. Card
            data is handled by Stripe per its own policies.
          </li>
          <li>
            <strong>Cookies &amp; local storage:</strong> We use cookies/local
            storage to keep you signed in, remember preferences, and improve the
            Service.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          How We Use Information
        </h2>
        <ul className="list-disc pl-6 mb-12 space-y-2">
          <li>Provide, maintain, and improve the Service.</li>
          <li>Authenticate users and manage sessions.</li>
          <li>Process subscriptions and prevent fraud.</li>
          <li>Communicate updates, security notices, and support.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Cookies</h2>
        <p className="mb-12">
          We use cookies and similar technologies to operate essential features,
          remember preferences, and measure usage. Some cookies and local
          storage are required for core functionality—like keeping you signed
          in. You can control or delete cookies in your browser settings, but
          disabling them may limit essential functions of the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Third-Party Services
        </h2>

        <p className="mb-4">
          We share data with service providers only as needed to operate the
          Service:
        </p>
        <ul className="list-disc pl-6 mb-12 space-y-2">
          <li>
            <strong>Supabase</strong> (authentication, database, hosting of auth
            flows).
          </li>
          <li>
            <strong>Stripe</strong> (payments and subscription management).
            Stripe may set cookies or collect data per its own policy.
          </li>
          <li>
            <strong>Apple/Google Sign-In</strong> (OAuth). When you use these
            options, your sign-in is governed by Apple/Google’s terms and
            privacy policies.
          </li>
        </ul>
        <p>
          Third parties process data under their own policies. Learn how to{" "}
          <a
            className="text-primary underline cursor-pointer"
            href="http://www.google.com/privacy_ads.html"
          >
            opt out of Google’s cookie usage
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Links to Third Parties
        </h2>
        <p className="mb-12">
          Our Service may link to third-party websites. We are not responsible
          for their content or privacy practices. Review their policies before
          providing personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Security</h2>
        <p className="mb-12">
          We use commercially reasonable measures, such as encryption in transit
          and restricted access controls, to protect your information. However,
          no method of transmission or electronic storage is 100% secure, and we
          cannot guarantee absolute security. We encourage you to use strong
          passwords and protect your login credentials.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Data Retention &amp; Your Rights
        </h2>
        <p className="mb-4">
          We retain information for as long as needed to provide the Service and
          meet legal obligations. You may request access, correction, or
          deletion of your personal data by contacting us at{" "}
          <a
            className="text-primary underline cursor-pointer"
            href="mailto:hello@readquail.com"
          >
            hello@readquail.com
          </a>
          . We may need to keep certain records for legal or security reasons.
        </p>

        <p className="mb-12">
          If you are located in the European Union or California, you have
          additional rights under GDPR/CCPA, including the rights to access,
          correct, port, delete, or object to certain processing of your
          personal data. To exercise these rights, contact us at{" "}
          <a
            className="text-primary underline cursor-pointer"
            href="mailto:hello@readquail.com"
          >
            hello@readquail.com
          </a>
          . We will verify your request and respond in accordance with
          applicable law.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Children’s Privacy
        </h2>
        <p className="mb-12">
          The Service is not directed to children under 13 (or under 16 where
          required by local law), and we do not knowingly collect personal
          information from them. If you believe a child has provided us personal
          information, contact us and we will take appropriate steps to remove
          it.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">
          Changes to This Policy
        </h2>
        <p className="mb-12">
          We may update this Privacy Policy from time to time. Changes are
          effective when posted on this page. We will notify you of material
          changes via the Service or by email when appropriate.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Contact</h2>
        <p className="mb-12">
          Questions or concerns? Email us at{" "}
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
