import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Script from 'next/script';



export const metadata = {
  title: "StoryWizard",
  description: "Replygen widget.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
       <head>
       <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-EYDG0YQ18N"
            strategy="afterInteractive"
          />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EYDG0YQ18N');
            `}
        </Script>

       </head>
      
        <body>
          <Toaster />
          {children}
        </body>


      </html>
    </ClerkProvider>
  );
}
