import Tooltip from "@/components/ui/tool-tip";

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
    <Tooltip label={description}>
      <div className="flex flex-row gap-2 border-2 border-black rounded-[10px] px-2 py-1 m-1">
        <img alt={name} src={icon} className="w-6 h-6" />
        <p className="cascadia-code-bold text-xm">{name}</p>
      </div>
    </Tooltip>
  );
}

export default IconBadge;
