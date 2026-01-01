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

import { useWebsiteRouter } from '@/hooks/useWebsiteRouter';
import Tooltip from '@/components/ui/tool-tip';
import useSFX from '@/hooks/useSFX';

function ClassicWebsiteButton() {
    const handleClassicWebsiteClick = useWebsiteRouter(
        'https://qwertuhh-classic.netlify.app/'
    );
    return (
        <div
            className="flex justify-center h-4xl"
            onMouseEnter={useSFX('hover3', 'classic-website')}
        >
            <Tooltip label="This is my old portfolio website" className="">
                <button
                    onClick={handleClassicWebsiteClick}
                    className="league-script-regular z-45 text-4xl mx-6 my-4 text-white cursor-pointer"
                >
                    visit my
                    <span className="rouge-script-regular">Classic</span>
                    Website
                </button>
            </Tooltip>
        </div>
    );
}

export default ClassicWebsiteButton;
