import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { asset } from "@/lib/site";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/BrandIcons";
import { EmailCard } from "@/components/ui/EmailLink";
import { Section } from "@/components/ui/Section";

const linkClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-semibold transition-colors hover:bg-surface";

export function Contact() {
  const links = [
    {
      href: profile.linkedinUrl,
      label: "LinkedIn",
      icon: LinkedInIcon,
    },
    { href: profile.githubUrl, label: "GitHub", icon: GitHubIcon },
    ...(profile.whatsappUrl
      ? [{ href: profile.whatsappUrl, label: "WhatsApp", icon: WhatsAppIcon }]
      : []),
  ];

  return (
    <Section
      id="contact"
      label="contact"
      title="Let's work together"
      intro="I'm open to backend and full-stack roles and collaborations. The fastest way to reach me is by email."
      alt
    >
      <div
        data-reveal
        className="rounded-2xl border border-border bg-background p-6 sm:p-10"
      >
        <EmailCard email={profile.email} />

        <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Icon className="size-5" />
              {label}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
          <a
            href={asset(profile.resumePath)}
            download={profile.resumeFileName}
            className={linkClass}
          >
            <Download aria-hidden="true" className="size-5" />
            Download CV
          </a>
        </div>
      </div>
    </Section>
  );
}
