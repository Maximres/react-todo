import React, { useCallback, useEffect } from "react";
import { orderedListsAndGroupsSelector } from "../ducks/selectors/orderedListsAndGroupsSelector";
import { IList } from "@/constants/types/listsTypes";
import { selectList, updateGroup, updateList } from "@features/lists";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/constants/types/redux";
import SimpleBar from "simplebar-react";
import { selectedListSelector } from "../ducks/selectors/selectedListSelector";
import ListGroup from "@/features/lists/components/ListGroup";

const ListSection = () => {
  const dispatch = useDispatch();
  const defaultLists = useAppSelector((x) => x.lists.defaultLists);
  const orderedListsGroups = useAppSelector(orderedListsAndGroupsSelector);
  const userLists = useAppSelector((x) => x.lists.userLists);
  const selectedList = useAppSelector(selectedListSelector);

  const handleItemClick = useCallback(
    (uid: string) => {
      const selected = userLists.find((i) => i.id === uid);
      if (selected == null) return;

      const isNotSameList = selected.id !== selectedList?.id;
      if (isNotSameList) dispatch(selectList(selected));
    },
    [userLists, selectedList],
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
    <section className="flex-grow-1 overflow-hidden">
      <SimpleBar className="h-100" scrollbarMaxSize={200} autoHide={false} forceVisible={true}>
        <div className="w-100 pe-1 pb-1">
          <ListGroup
            items={defaultLists}
            onItemClick={handleItemClick}
            onListEditSubmit={handleListEditSubmit}
            onGroupEditSubmit={handleGroupEditSubmit}
            dndDisabled={true}
          />
          <hr className="w-100 m-0" />
          <ListGroup
            items={orderedListsGroups}
            onItemClick={handleItemClick}
            onListEditSubmit={handleListEditSubmit}
            onGroupEditSubmit={handleGroupEditSubmit}
          />
        </div>
      </SimpleBar>
    </section>
  );
};

export { ListSection };
