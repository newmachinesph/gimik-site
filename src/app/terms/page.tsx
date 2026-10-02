import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use (EULA)",
  description:
    "The terms of use and end user licence agreement for Gimik, including the zero-tolerance rule on objectionable content and abusive users.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use (EULA)" updated="2 October 2026">
      <section>
        <p>
          These terms are the end user licence agreement (EULA) for Gimik. You
          agree to them before you create an account or sign in, and you may
          use the app only while you keep to them.
        </p>
      </section>
      <section>
        <h2>The service</h2>
        <p>
          Gimik is a mobile app for keeping a list of activities and bucket-list
          items and turning them into scheduled plans — alone, with one other
          person, or with a group. These terms apply to the app and to this
          website.
        </p>
      </section>
      <section>
        <h2>Your account</h2>
        <ul>
          <li>You must provide accurate information when creating an account.</li>
          <li>You are responsible for activity that happens under your account.</li>
          <li>You must be old enough to use the app under the law where you live.</li>
        </ul>
      </section>
      <section>
        <h2>Your content</h2>
        <p>
          The list items, plans, and messages you create belong to you. You give
          us the limited license we need to store and display them to the
          people you share them with — nothing more. Do not post content that is
          unlawful, harassing, or that you do not have the right to share.
        </p>
      </section>
      <section id="objectionable-content">
        <h2>No tolerance for objectionable content or abusive users</h2>
        <p>
          Gimik has no tolerance for objectionable content or abusive users.
          This covers everything you write or upload: your name, profile and
          photos, the somedays you write, group names, and messages.
        </p>
        <ul>
          <li>
            No content that is hateful, harassing, threatening, sexually
            explicit, violent, or illegal, and no spam or scams.
          </li>
          <li>No bullying, stalking, impersonating, or pressuring another person.</li>
          <li>
            Text is filtered automatically, and anything objectionable is
            refused before it is posted.
          </li>
          <li>
            You can report any person, someday, or message from its own screen,
            and you can block any person. Blocking removes their content from
            your app immediately and sends us a report.
          </li>
          <li>
            We review every report within 24 hours. Content that breaks this
            rule is removed and the account that posted it is permanently
            closed.
          </li>
        </ul>
        <p>
          To report something from outside the app, write to{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not use Gimik to harm, harass, or deceive other people.</li>
          <li>Do not attempt to break, probe, or overload the service.</li>
          <li>Do not scrape or resell the service or its data.</li>
        </ul>
      </section>
      <section>
        <h2>Plans happen in the real world</h2>
        <p>
          Gimik helps you schedule activities; it does not run them. Use your own
          judgment about the activities you plan and the people you plan them
          with. To the extent the law allows, we are not liable for what happens
          at activities arranged through the app.
        </p>
      </section>
      <section>
        <h2>Ending things</h2>
        <p>
          You can stop using Gimik and delete your account at any time. We can
          suspend or close accounts that break these terms. We may update these
          terms; if we make material changes we will tell you in the app before
          they take effect.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
