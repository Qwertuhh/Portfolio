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

import Tooltip from "@/components/ui/tool-tip";
import useSFX from "@/hooks/useSFX";

function IconBadge({
  icon,
  name,
  description,
}: {
  icon?: string;
  name: string;
  description: string;
}) {
  return (
    <Tooltip label={description} className="cursor-pointer">
      <div
        className="flex flex-row gap-2 border-2 border-black rounded-[10px] px-2 py-1 m-1"
        onMouseEnter={useSFX("hover", name.toLocaleLowerCase())}
      >
        <img alt={name} src={icon} className="w-6 h-6" />
        <p className="cascadia-code-bold text-xm">{name}</p>
      </div>
    </Tooltip>
  );
}

export default IconBadge;
