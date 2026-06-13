import Script from 'next/script';

// ADA accessibility widget (UserWay). Renders nothing until the clinic's
// UserWay account ID is provided via NEXT_PUBLIC_USERWAY_ACCOUNT_ID, so the
// code can ship ahead of the account being provisioned. Once the env var is
// set in Vercel the widget loads on every page automatically.
export default function UserWayWidget() {
  const accountId = process.env.NEXT_PUBLIC_USERWAY_ACCOUNT_ID;
  if (!accountId) return null;

  return (
    <Script
      id="userway-widget"
      src="https://cdn.userway.org/widget.js"
      data-account={accountId}
      strategy="afterInteractive"
    />
  );
}
