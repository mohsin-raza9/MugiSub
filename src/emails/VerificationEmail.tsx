import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

export interface EmailVerificationProps {
  userName?: string;
  verificationUrl?: string;
  companyName?: string;
  companyLogoUrl?: string;
}

export const VerificationEmail = ({
  userName = "Valued Member",
  verificationUrl = "https://example.com/verify?token=example_token_123",
  companyName = "MugiSub",
  companyLogoUrl,
}: EmailVerificationProps) => {
  // Only render the logo if it's a secure absolute HTTPS URL
  const isValidLogo = companyLogoUrl && companyLogoUrl.startsWith("https://");

  // Truncate long JWT tokens in the display text of the fallback box to prevent spam triggers
  const getDisplayUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      const token = parsed.searchParams.get("token");
      if (token && token.length > 15) {
        parsed.searchParams.set("token", `${token.substring(0, 15)}...`);
      }
      return decodeURIComponent(parsed.toString());
    } catch {
      return url;
    }
  };

  const displayUrl = getDisplayUrl(verificationUrl);

  return (
    <Html>
      <Head />
      <Preview>Verify your email address to get started with {companyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header / Logo */}
          <Section style={headerSection}>
            {isValidLogo ? (
              <Img
                src={companyLogoUrl}
                width="auto"
                height="40"
                alt={companyName}
                style={logo}
              />
            ) : (
              <Text style={companyText}>{companyName}</Text>
            )}
          </Section>

          {/* Email Body Card */}
          <Section style={cardSection}>
            <Heading style={heading}>Confirm your email address</Heading>
            
            <Text style={greeting}>Hello {userName},</Text>
            
            <Text style={paragraph}>
              Thank you for signing up for <strong>{companyName}</strong>! To complete your registration and secure your account, please verify your email address by clicking the button below.
            </Text>

            {/* Primary CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={verificationUrl}>
                Verify Email Address
              </Button>
            </Section>

            {/* Security Notice */}
            <Text style={expiryText}>
              ⏰ This verification link is temporary and will expire in <strong>15 minutes</strong> for security reasons.
            </Text>

            <Hr style={divider} />

            {/* Fallback URL Box */}
            <Section style={fallbackSection}>
              <Text style={fallbackText}>
                If the button above doesn't work, copy and paste the URL below into your browser:
              </Text>
              <div style={fallbackBox}>
                <Link href={verificationUrl} style={fallbackLink}>
                  {displayUrl}
                </Link>
              </div>
            </Section>

            <Text style={supportText}>
              If you didn't create an account, you can safely ignore this email.
            </Text>
          </Section>
        </Container>

        {/* Footer */}
        <Container style={footerContainer}>
          <Text style={footerText}>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </Text>
          <Text style={footerSubtext}>
            Sent with 💜 to protect your account security.
          </Text>
          <Text style={footerLinks}>
            <Link href="https://example.com/privacy" style={footerLink}>Privacy Policy</Link>
            {" • "}
            <Link href="https://example.com/support" style={footerLink}>Support Center</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;

// --- E-mail Client-Safe Premium Styling ---

const main: React.CSSProperties = {
  backgroundColor: "#eceef1",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  margin: "0 auto",
  padding: "48px 16px",
};

const container: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
};

const headerSection: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logo: React.CSSProperties = {
  margin: "0 auto",
  display: "block",
};

const companyText: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#34394d", // Slate blue matching the MugiSub brand
  margin: "0 auto",
  letterSpacing: "-0.5px",
  textAlign: "center" as const,
};

const cardSection: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "40px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
};

const heading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "700",
  textAlign: "center" as const,
  color: "#2b2f3d", // Dark theme header color
  margin: "0 0 24px 0",
  letterSpacing: "-0.25px",
};

const greeting: React.CSSProperties = {
  fontSize: "16px",
  color: "#2b2f3d",
  margin: "0 0 12px 0",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#34394d", // Slate color for body text readability
  margin: "0 0 24px 0",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "32px 0 24px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#34394d", // MugiSub Primary Brand Slate
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 30px",
  lineHeight: "100%",
  boxShadow: "0 4px 6px -1px rgba(52, 57, 77, 0.2), 0 2px 4px -1px rgba(52, 57, 77, 0.1)",
};

const expiryText: React.CSSProperties = {
  fontSize: "13px",
  color: "#6b7280",
  textAlign: "center" as const,
  margin: "0 0 24px 0",
};

const divider: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const fallbackSection: React.CSSProperties = {
  marginBottom: "24px",
};

const fallbackText: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b7280",
  lineHeight: "18px",
  margin: "0 0 8px 0",
};

const fallbackBox: React.CSSProperties = {
  backgroundColor: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  padding: "12px",
  wordBreak: "break-all" as const,
};

const fallbackLink: React.CSSProperties = {
  fontSize: "12px",
  color: "#a11f1f", // MugiSub Brand Red Accent
  textDecoration: "none",
};

const supportText: React.CSSProperties = {
  fontSize: "13px",
  color: "#9ca3af",
  textAlign: "center" as const,
  margin: "24px 0 0 0",
};

const footerContainer: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
  textAlign: "center" as const,
  padding: "24px 0 0 0",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "0 0 4px 0",
};

const footerSubtext: React.CSSProperties = {
  fontSize: "11px",
  color: "#9ca3af",
  margin: "0 0 12px 0",
};

const footerLinks: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b7280",
};

const footerLink: React.CSSProperties = {
  color: "#4b5563",
  textDecoration: "underline",
  margin: "0 4px",
};
