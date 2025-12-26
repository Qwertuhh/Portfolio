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

import type { JSX } from 'react';
import { lazy, Suspense, useState } from 'react';

import LazyLoader from '@/components/ui/loader';
import InteractionOverlay from '@/components/interaction-overlay';
import useScrollSFX from './hooks/useScrollSFX';
import CustomCursor from './components/ui/custom-cursor';
const HeroComponent = lazy(() => import('@/components/hero-component'));
const Navbar = lazy(() => import('@/components/navbar'));
const AboutMe = lazy(() => import('@/components/about-me'));
const Projects = lazy(() => import('@/components/projects'));

function App(): JSX.Element {
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteraction = () => {
        setHasInteracted(true);
    };
    useScrollSFX();

    return (
        <div>
            <CustomCursor />
            <InteractionOverlay onInteraction={handleInteraction} />
            {hasInteracted && (
                <>
                    <Suspense fallback={<LazyLoader />}>
                        <Navbar />
                    </Suspense>
                    <Suspense fallback={<LazyLoader />}>
                        <HeroComponent />
                    </Suspense>
                    <Suspense fallback={<LazyLoader />}>
                        <AboutMe />
                    </Suspense>
                    <Suspense fallback={<LazyLoader />}>
                        <Projects />
                    </Suspense>
                </>
            )}
        </div>
    );
}

export default App;
