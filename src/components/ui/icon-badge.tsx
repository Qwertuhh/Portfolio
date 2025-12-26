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
