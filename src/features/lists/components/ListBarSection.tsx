import React, { useCallback, useEffect, useRef } from "react";
import { orderedListsAndGroupsSelector } from "../ducks/selectors/orderedListsAndGroupsSelector";
import { IList } from "@/constants/types/listsTypes";
import { selectList, updateGroup, updateList } from "@features/lists";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/constants/types/redux";
import SimpleBar from "simplebar-react";
import { IGroupedList } from "../ducks/constants/types";

export type RenderProps = {
  defaultItems: IList[];
  items: (IList | IGroupedList)[];
  itemClick: (uid: string) => void;
  editListSubmit: (uid: string, name: string) => void;
  editGroupSubmit: (uid: string, name: string) => void;
};

type Props = {
  render: (args: RenderProps) => JSX.Element;
};

const ListBarSection = ({ render }: Props) => {
  const dispatch = useDispatch();
  const defaultLists = useAppSelector((x) => x.lists.defaultLists);
  const orderedListsGroups = useAppSelector(orderedListsAndGroupsSelector);
  const userLists = useAppSelector((x) => x.lists.userLists);
  const selectedList = useAppSelector((x) => x.lists.selectedList);


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
    <section
      className="flex-grow-1 overflow-hidden"
    >
      <SimpleBar
        className="h-100"
        scrollbarMaxSize={200}
        autoHide={false}
        forceVisible={true}
      >
        <div className="w-100 pe-1 pb-1">
            {render({
              defaultItems: defaultLists,
              items: orderedListsGroups,
              itemClick: handleItemClick,
              editListSubmit: handleListEditSubmit,
              editGroupSubmit: handleGroupEditSubmit,
            })}
        </div>
      </SimpleBar>
    </section>
  );
};

export { ListBarSection };
