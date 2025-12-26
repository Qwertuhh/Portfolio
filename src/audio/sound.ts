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

import { soundManager } from "./soundManager";

const sounds = {
  click: soundManager.createSound(["/sfx/click.ogg", "/sfx/click.mp3"], {
    volume: 0.25,
  }),

  hover: soundManager.createSound(["/sfx/hovering.ogg", "/sfx/hovering.mp3"], {
    volume: 0.5,
  }),
  hover2: soundManager.createSound(
    ["/sfx/hovering2.ogg", "/sfx/hovering2.mp3"],
    {
      volume: 0.25,
    }
  ),

  scroll: soundManager.createSound(["/sfx/scrolling.ogg"], {
    volume: 0.25,
  }),
  hover3: soundManager.createSound(
    ["/sfx/hard-typewriter-click.ogg", "/sfx/hard-typewriter-click.mp3"],
    {
      volume: 0.25,
    }
  ),
  typewriterClick: soundManager.createSound(
    ["/sfx/soft-typewriter-click.ogg", "/sfx/soft-typewriter-click.mp3"],
    {
      volume: 0.25,
    }
  ),
};

type SoundType = keyof typeof sounds;

export { sounds };
export type { SoundType };
