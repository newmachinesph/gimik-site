import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Gimik handles your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="8 August 2026">
      <section>
        <h2>What we collect</h2>
        <p>
          When you use Gimik, we collect the information you give us directly:
          your account details (name, email address), the activities and
          bucket-list items you add, the plans you make, and the friends and
          groups you connect with. We also collect basic device information
          (device type, operating system, app version) to keep the app working
          well.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To run the app: showing your list, finding overlap with your friends, and scheduling plans.</li>
          <li>To notify you about plans you are part of, if you allow notifications.</li>
          <li>To fix problems and improve the app.</li>
        </ul>
      </section>
      <section>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell your personal data.</li>
          <li>We do not show your list to anyone you have not connected with.</li>
          <li>We do not use your data for third-party advertising.</li>
        </ul>
      </section>
      <section>
        <h2>Sharing</h2>
        <p>
          Your list items are visible to the friends and groups you choose to
          share them with — that is the point of the app. Plans you open up are
          visible to people already going. We share data with service providers
          only as needed to operate the app (for example, hosting and
          notifications), under contracts that limit how they can use it.
        </p>
      </section>
      <section>
        <h2>Deletion and your rights</h2>
        <p>
          You can delete your account from the app settings at any time, which
          removes your account data from our systems. You can also email us to
          request a copy of your data or its deletion. Depending on where you
          live, you may have additional rights under local law, and we honor
          them.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
