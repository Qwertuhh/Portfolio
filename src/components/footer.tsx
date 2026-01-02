/**
 * Copyright (c) 2026 Arihant Jain, Qwertuhh
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

import { useWebsiteRouter } from '@/hooks/useWebsiteRouter';
import useHandleScrollSmooth from '@/hooks/useHandelScrollSmooth';
import useSFX from '@/hooks/useSFX';

function Footer() {
    const handleClassicWebsiteClick = useWebsiteRouter(
        'https://qwertuhh-classic.netlify.app/'
    );
    const handleSmoothScrollAboutMe = useHandleScrollSmooth('about-me');
    const handleSmoothScrollProjects = useHandleScrollSmooth('projects');
    const handleSmoothScrollSourceCode = useHandleScrollSmooth('source-code');

    const hoverFooter = useSFX('hover2', 'footer');

    return (
        <footer
            className="bg-black text-white w-full flex flex-col items-center justify-center gap-2 px-4 py-6"
            onMouseOver={hoverFooter}
        >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-4 w-full max-w-6xl">
                <ul
                    className="flex w-full lg:flex-col lg:w-40 lg:scroll-auto gap-4 p-4 lg:p-0 funnel-display-regular cursor-pointer text-center lg:text-left not-lg:justify-evenly"
                >
                    <li
                        className="underline underline-offset-2 hover:underline-offset-4 "
                        onClick={() => {
                            handleSmoothScrollAboutMe();
                        }}
                    >
                        About me
                    </li>
                    <li
                        className="underline underline-offset-2 hover:underline-offset-4 "
                        onClick={() => {
                            handleSmoothScrollProjects();
                        }}
                    >
                        Projects
                    </li>
                    <li
                        className="underline underline-offset-2 hover:underline-offset-4 "
                        onClick={() => {
                            handleSmoothScrollSourceCode();
                        }}
                    >
                        Source Code
                    </li>
                </ul>
                <p className="w-full lg:w-(--main-width) jetbrains-mono-regular text-justify mx-0 lg:mx-4 cursor-pointer text-sm lg:text-base ">
                    <p>Copyright © 2026 Arihant Jain,Qwertuhh</p>
                    <p>
                        Distributed under the{' '}
                        <a
                            href="https://opensource.org/licenses/MIT"
                            className="underline underline-offset-2 hover:underline-offset-4"
                        >
                            MIT License
                        </a>
                        . THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
                        ANY KIND.
                    </p>
                </p>
            </div>
            <div className="flex flex-row overflow-x-auto scroll-smooth justify-center px-2 items-center gap-0 w-full max-w-2xl">
                <button
                    onClick={handleClassicWebsiteClick}
                    className="h-12 league-script-regular z-45 text-xl lg:text-2xl px-2 lg:px-6 py-2 lg:py-2 border-2 border-white text-white cursor-pointer whitespace-nowrap"
                >
                    visit my
                    <span className="rouge-script-regular">Classic</span>{' '}
                    website
                </button>
                <button
                    onClick={handleClassicWebsiteClick}
                    className="h-12 league-script-regular z-45 text-xl lg:text-2xl px-2 lg:px-6 py-2 lg:py-2 border-2 border-white text-white cursor-pointer whitespace-nowrap"
                >
                    visit my
                    <span className="rouge-script-regular">Static</span> website
                </button>
            </div>
        </footer>
    );
}

export default Footer;
