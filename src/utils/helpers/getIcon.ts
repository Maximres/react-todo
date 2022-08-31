import Icons from "@/components/AppIcons";

type IconKey = keyof typeof Icons;

export const getIcon = (name: IconKey, arg?: any) => Icons[name](arg ?? {});
export const getListIcon = (name?: string, props?: any) => {
  return (name as IconKey) in Icons
    ? getIcon(name as IconKey, props)
    : getIcon("List", props);
};
