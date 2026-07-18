const Footer = () => {
    return (
        <footer className="w-full px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-black font-sans border-t border-[#999]/30">
            {/* Left side empty spacer */}
            <div className="hidden md:block flex-1" />

            {/* Center side: Multi-line Metadata */}
            <div className="flex-2 flex flex-col items-center text-center space-y-0.5 w-full">
                <div className="w-full text-center">
                    AniDB is licensed under a{" "}
                    <a
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1f5da1] hover:underline"
                    >
                        Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
                    </a>
                    .
                </div>
                <div className="w-full text-center text-black">
                    v 2022-04, © 2002-2022 by AniDB; all rights reserved. [0s] - 19.05.2026 18:27:47
                </div>
                <div className="w-full text-center pr-0 md:pr-[12%] text-gray-800 font-sans">
                    design by deridiot
                </div>
            </div>

            {/* Right side: Social Icons Matrix */}
            <div className="flex-1 flex justify-center md:justify-end items-center gap-2 text-[#1f5da1] w-full">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    title="Facebook"
                >
                    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                    </svg>
                </a>
                <span className="text-[#1f5da1]/40 font-light select-none">|</span>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    title="Instagram"
                >
                    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                </a>
                <span className="text-[#1f5da1]/40 font-light select-none">|</span>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    title="LinkedIn"
                >
                    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
                        <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                    </svg>
                </a>
                <span className="text-[#1f5da1]/40 font-light select-none">|</span>
                <a
                    href="https://twitter.com/AniDBStatus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    title="X (Twitter)"
                >
                    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>
                <span className="text-[#1f5da1]/40 font-light select-none">|</span>
                <a
                    href="https://www.patreon.com/AniDB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    title="Patreon"
                >
                    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
                        <path d="M0 .05h4.26v23.9H0zm14.73.05a9.14 9.14 0 00-9.14 9.14A9.14 9.14 0 0014.73 19a9.14 9.14 0 009.14-9.14A9.14 9.14 0 0014.73.05z" />
                    </svg>
                </a>
            </div>
        </footer>
    )
}

export default Footer