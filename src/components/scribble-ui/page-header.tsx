import { Link } from "@tanstack/react-router"
import { ScribbleButton } from "./button"
import { ScribbleLogo } from "./decorative/logo"
import { cn } from "./lib/utils"

export interface ScribblePageHeaderProps {
  /** Show sign in button */
  showSignIn?: boolean
  /** Show join waitlist button */
  showWaitlist?: boolean
  /** Href for sign-in button (use a normal anchor to avoid coupling to router route types) */
  signInHref?: string
  /** Href for waitlist button (use a normal anchor to avoid coupling to router route types) */
  waitlistHref?: string
  /** Additional class names */
  className?: string
}

export function ScribblePageHeader({
  showSignIn = false,
  showWaitlist = false,
  signInHref = "/login",
  waitlistHref = "/waitlist",
  className,
}: ScribblePageHeaderProps) {
  return (
    <header className={cn("bg-[#fffef8]", className)}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <ScribbleLogo />
        </Link>

        <nav className="flex items-center gap-4">
          {showSignIn && (
            <ScribbleButton asChild variant="primary" size="sm">
              <a href={signInHref}>Sign In</a>
            </ScribbleButton>
          )}
          {showWaitlist && (
            <ScribbleButton asChild variant="primary" size="sm">
              <a href={waitlistHref}>Join Waitlist</a>
            </ScribbleButton>
          )}
        </nav>
      </div>
    </header>
  )
}
