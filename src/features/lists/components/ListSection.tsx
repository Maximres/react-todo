import React, { useCallback, useEffect, useMemo } from "react";
import {
  GroupList,
  selectorListsAndGroupLists,
} from "../ducks/selectors/selectorListsAndGroupLists";
import { IGroup, IList } from "@/constants/types/listsTypes";
import { selectList, updateGroup, updateList } from "@features/lists";
import _orderBy from "lodash/orderBy";
import _isEmpty from "lodash/isEmpty";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/constants/types/redux";
import SimpleBar from "simplebar-react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { isListItem } from "@/utils/helpers/listItemResolver";
import { getOrderNumber } from "@/utils/helpers/order";

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

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source: src, destination: dest, draggableId } = result;

    if (!dest) return;

    if (result.type === "GROUP") {
      //source from group



      //to another group
      if (dest.droppableId.includes("group")) {
        const groupId = dest.droppableId.replace("group_", "");
        const groupSrcId = src.droppableId.replace("group_", "");
        const groupItem = orderedListsGroups.find(
          (x) => x.id === groupId,
        ) as GroupList;

        const groupSrcItem = orderedListsGroups.find(
          (x) => x.id === groupSrcId,
        ) as GroupList;

        if (!groupItem) return;

        if (!_isEmpty(groupItem.lists)) {
          const listItem = groupItem.lists![dest.index];
          const orderNumber = listItem.order;
          const nextItem = groupItem.lists![dest.index + 1];
          let orderStamp = getOrderNumber();
          if (nextItem) {
            orderStamp = nextItem.order;
          }
          const meanOrder = (orderNumber + (orderStamp ?? 0.1)) / 2.0;

          const srcItem = groupSrcItem.lists?.find((x) => x.id === draggableId);
          if (!srcItem) return;

          const srcItemCopy = {
            ...srcItem,
            order: meanOrder,
            groupId: groupId,
          };

          dispatch(updateList(srcItemCopy as IList));
          return;
        }


        const srcItem = groupSrcItem.lists?.find((x) => x.id === draggableId);
        if (!srcItem) return;

        const srcItemCopy = {
          ...srcItem,
          order: getOrderNumber(),
          groupId: groupId,
        };
        dispatch(updateList(srcItemCopy as IList));
        return;
      }
    }

    //to top level list
    const movedUp = src.index >= dest.index;
    const nextIndex = movedUp ? -1 : +1;
    const destItemAbove = orderedListsGroups[dest.index];
    const destItemBelow = orderedListsGroups[dest.index + 1];
    const meanOrder =
      (destItemAbove.order + (destItemBelow?.order ?? getOrderNumber())) / 2.0;
    const srcItem = listsGroups.find((x) => x.id === draggableId);
    if (!srcItem) return;

    const srcItemCopy = { ...srcItem, order: meanOrder, groupId: "" };
    if (isListItem(srcItemCopy)) {
      dispatch(updateList(srcItemCopy as IList));
    } else {
      dispatch(updateGroup(srcItemCopy as IGroup));
    }

    return;
  };
  return (
    <section className="flex-grow-1 overflow-hidden">
      <SimpleBar
        className="overflow-auto h-100"
        scrollbarMaxSize={200}
        autoHide={false}
        forceVisible={true}
      >
        <div className="w-100 pe-1">
          <DragDropContext onDragEnd={onDragEnd}>
            {render({
              defaultItems: defaultLists,
              items: orderedListsGroups,
              itemClick: handleItemClick,
              editListSubmit: handleListEditSubmit,
              editGroupSubmit: handleGroupEditSubmit,
            })}
          </DragDropContext>
        </div>
      </SimpleBar>
    </section>
  );
};

export { ListSection };
