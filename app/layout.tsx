import { type Metadata } from "next";
import { Analytics } from "@/lib/analytics";

import { Providers } from "@/app/providers";
import { Layout } from "@/components/Layout";

import "@/styles/tailwind.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Spencer Sharp",
    default:
      "Erik C. Rutledge - Solution designer, developer, and amateur filmmaker",
  },
  description:
    "I’m Erik, a self-motivated solution designer and developer with a propensity for videography and film. I spent over three years living in Europe while working for a Singapore-based computer vision company. Following that as a Solutions Consultant for an Estonia-based autonomous negotiation software company. I currently travel in a converted mini school bus exploring the US and Mexico.",
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
