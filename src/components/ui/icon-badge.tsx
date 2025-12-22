import Tooltip from "@/components/ui/tool-tip";

function IconBadge({ icon, label }: { icon?: string; label: string }) {
  return (
    <Tooltip label={label} className="">
      <div className="flex flex-row gap-2 border-2 border-black rounded-xl px-2 py-1 m-1">
        <img alt={label} src={icon} className="w-6 h-6" />
        <p className="cascadia-code-bold text-xm">{label}</p>
      </div>
    </Tooltip>
  );
}

export default IconBadge;
