import React, { useCallback, useEffect, useMemo } from "react";
import { GroupList, selectorListsAndGroupLists } from "../ducks/selectors/selectorListsAndGroupLists";
import { IList } from "@/constants/types/listsTypes";
import { selectList, updateGroup, updateList } from "@features/lists";
import _orderBy from "lodash/orderBy";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/constants/types/redux";

export type RenderProps = {
  defaultItems: IList[];
  items: (IList | GroupList)[];
  itemClick: (uid: string) => void;
  editListSubmit: (uid: string, name: string) => void;
  editGroupSubmit: (uid: string, name: string) => void;
};

type Props = {
  render: (args: RenderProps) => JSX.Element;
};

const ListSection = ({ render }: Props) => {
  const dispatch = useDispatch();
  const defaultLists = useAppSelector((x) => x.lists.defaultLists);
  const listsGroups = useAppSelector(selectorListsAndGroupLists);
  const userLists = useAppSelector((x) => x.lists.userLists);
  const selectedList = useAppSelector((x) => x.lists.selectedList);

  const orderedListsGroups = useMemo(() => {
    return _orderBy(listsGroups, ["order"], ["asc"]);
  }, [listsGroups]);

  const handleItemClick = useCallback(
    (uid: string) => {
      const selectedList = userLists.find((i) => i.id === uid);
      if (selectedList == null) return;

      dispatch(selectList(selectedList));
    },
    [userLists],
  );

  const handleListEditSubmit = useCallback((uid: string, name: string) => {
    dispatch(updateList({ id: uid, name: name } as IList));
  }, []);

  const handleGroupEditSubmit = useCallback((uid: string, name: string) => {
    dispatch(updateGroup({ id: uid, name: name } as IList));
  }, []);

  useEffect(() => {
    let title = "To Do";

    const name = selectedList?.name;
    if (name != null) title = `${selectedList?.name} - ${title}`;

    window.document.title = title;
  }, [selectedList]);

  return (
    <section className="flex-grow-1 overflow-auto">
      <div className="w-100">
        {render({
          defaultItems: defaultLists,
          items: orderedListsGroups,
          itemClick: handleItemClick,
          editListSubmit: handleListEditSubmit,
          editGroupSubmit: handleGroupEditSubmit,
        })}
      </div>
    </section>
  );
};

export { ListSection };
