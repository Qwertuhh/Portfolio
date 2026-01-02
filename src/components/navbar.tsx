/**
 * Copyright (c) 2025 Arihant Jain, Qwertuhh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import useSFX from '@/hooks/useSFX';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import useHandleScrollSmooth from '@/hooks/useHandelScrollSmooth';
import HoverScrambleSwap from './ui/hover-scramble-text';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleSmoothScrollAboutMe = useHandleScrollSmooth('about-me', setIsMobileMenuOpen);
    const handleSmoothScrollProjects = useHandleScrollSmooth('projects', setIsMobileMenuOpen);
   
    const handleGitHubClick = () => {
        console.log('Opening GitHub');
        window.open('https://github.com/qwertuhh/portfolio', '_blank');
        setIsMobileMenuOpen(false); // Close mobile menu after navigation
    };

    const hoverNavLinks = useSFX('hover3', 'nav-links');
    return (
        <nav className="flex flex-row justify-center items-center p-4 h-(--navbar-height) relative z-50">
            <div className="flex flex-row items-center justify-between gap-2 border-2 border-black rounded-full w-(--main-width) bg-white/90 backdrop-blur-sm">
                <img
                    src="./profile-image/neutral_qwertuhh.svg"
                    alt="neutral qwertuhh logo"
                    className="w-16"
                />

                {/* Desktop Navigation */}
                <div className="hidden md:block mx-auto">
                    <ul className="flex flex-row gap-14 cascadia-code-semibold">
                        <li>
                            <button
                                onClick={handleSmoothScrollAboutMe}
                                onMouseEnter={hoverNavLinks}
                                className=" transition-colors cursor-pointer p-2 rounded hover:underline"
                            >
                                About me
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleSmoothScrollProjects}
                                onMouseEnter={hoverNavLinks}
                                className=" transition-colors cursor-pointer p-2 rounded hover:underline"
                            >
                                Projects
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleGitHubClick}
                                onMouseEnter={hoverNavLinks}
                                className=" transition-colors cursor-pointer p-2 rounded hover:scale-120"
                                title="View GitHub"
                            >
                                <HoverScrambleSwap text="Code">
                                Co▟e
                                </HoverScrambleSwap>
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 pr-6 rounded transition-colors"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6 cursor-pointer" />
                    ) : (
                        <Menu className="w-6 h-6 cursor-pointer" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-(--main-width) bg-white/90 backdrop-blur-sm border-2 border-black rounded-[40px] p-4">
                    <ul className="flex flex-col gap-4 cascadia-code-semibold text-center">
                        <li>
                            <button
                                onClick={handleSmoothScrollAboutMe}
                                className=" transition-colors cursor-pointer p-2 rounded w-full"
                            >
                                About me
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleSmoothScrollProjects}
                                className=" transition-colors cursor-pointer p-2 rounded w-full"
                            >
                                Projects
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={handleGitHubClick}
                                className=" transition-colors cursor-pointer p-2 rounded w-full flex items-center justify-center gap-2"
                                title="View GitHub"
                            >
                                Co▟e
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
