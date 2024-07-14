"use server";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <div className="container flex flex-col gap-1 md:gap-2">
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-col gap-1">
          {/* List subheader */}
          <p className="text-muted-foreground text-sm">Authentication</p>

          <ul>
            <li>Sign Up</li>
            <li>Login</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          {/* List subheader */}
          <p className="text-muted-foreground text-sm">Info</p>

          <ul>
            <li>
              <Link href="/about/" rel="noopener" underline="none">
                About
              </Link>
            </li>
            <li>Contact us</li>
            <li>Career</li>
            <li>Parent Site</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          {/* List subheader */}
          <p className="text-muted-foreground text-sm">Good listens</p>

          <ul>
            <li>
              <Link
                rel="noopener"
                underline="none"
                href="https://open.spotify.com/track/35dSYPOnoGvis2ZOUe4xDv?si=be5ce0ab47494974"
              >
                House on Fire - Rise Against
              </Link>
            </li>
            <li>
              <Link
                rel="noopener"
                underline="none"
                href="https://open.spotify.com/track/0bkW98npv8EsWQ2fXFzK56?si=4ae8c8337f0d4309"
              >
                From Eden - Hozier
              </Link>
            </li>
            <li>
              <Link
                rel="noopener"
                underline="none"
                href="https://open.spotify.com/track/4bHsxqR3GMrXTxEPLuK5ue?si=3c57d2f92bc9450c"
              >
                Don&apos;t stop believin&apos; - Journey
              </Link>
            </li>
            <li>
              <Link
                rel="noopener"
                underline="none"
                href="https://open.spotify.com/track/64VLqyvVCCAXyqKCqs40z8?si=180a8d94852e44cb"
              >
                While we sleep - Insomnium
              </Link>
            </li>
            <li>
              <Link
                rel="noopener"
                underline="none"
                href="https://open.spotify.com/track/0ePmfd8y7g4zs3E6ew7pDB?si=9aa4ce75f0284514"
              >
                The Red Baron - Sabaton
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <span className="w-full h-px bg-neutral-500" />

      <p className="text-center">
        Made with &#10084; by{" "}
        <Link
          rel="noopener"
          underline="hover"
          href="https://github.com/mmxNiloy"
        >
          mmxNiloy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
