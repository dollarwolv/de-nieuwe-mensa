import Image from "next/image";

const footerLinks = ["About", "Transparency", "Catering", "Blog"];

const contactLinks = [
  {
    label: "info@denieuwemensa.nl",
    href: "mailto:info@denieuwemensa.nl",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        <path d="m22 8-10 6L2 8" />
      </svg>
    ),
  },
  {
    label: "denieuwemensa.nl",
    href: "https://denieuwemensa.nl",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 4 3 14 0 18" />
      </svg>
    ),
  },
  {
    label: "@denieuwemensa",
    href: "https://instagram.com/denieuwemensa",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17" cy="7" r="1.2" />
      </svg>
    ),
  },
];

export default function StickyFooter() {
  return (
    <footer className="bg-dnm-black text-dnm-white mt-10 w-full">
      <div className="flex flex-col gap-6 px-4 py-5 md:px-10 md:py-8">
        <div className="flex w-full gap-10">
          <div className="flex w-full flex-row justify-between gap-4">
            <nav className="flex flex-col text-lg leading-[95%] font-extrabold md:text-3xl">
              {footerLinks.map((link) => (
                <a key={link} href="#" className="w-fit hover:opacity-80">
                  {link}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-2 md:gap-3">
              <span className="text-lg leading-[95%] font-extrabold md:text-3xl">
                Contact info
              </span>
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-sm leading-[95%] font-semibold hover:opacity-80 md:text-2xl"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="ml-auto hidden items-start md:flex">
            <Image
              src="/logo.png"
              alt="De Nieuwe Mensa logo"
              width={210}
              height={140}
              className="h-auto w-48"
            />
          </div>
        </div>

        <div className="flex w-full items-end justify-between">
          <span className="text-dnm-gray text-xs font-medium md:text-sm">
            designed and hand coded by justin dotzlaw
          </span>

          <div className="flex items-end md:hidden">
            <Image
              src="/logo.png"
              alt="De Nieuwe Mensa logo"
              width={210}
              height={140}
              className="h-auto w-24"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
