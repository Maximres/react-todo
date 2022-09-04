import Icons from "@/components/AppIcons";

type IconKey = keyof typeof Icons;

export const getIcon = (name: IconKey, arg?: any) => Icons[name];
export const getListIcon = (name?: string, props?: any) => {
  if ((name as IconKey) in Icons) {
    const NamedIcon = getIcon(name as IconKey);
    return <NamedIcon {...props} />;
  }
  const DefaultIcon = getIcon("List");
  return <DefaultIcon {...props} />;
};
