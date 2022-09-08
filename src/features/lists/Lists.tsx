import React, { useEffect, useMemo, useState } from "react";
import GroupItem from "./components/GroupItem";
import ListItem from "./components/ListItem";
import { useAppSelector } from "@/constants/types/redux";
import { getListIcon } from "@/utils/helpers/getIcon";
import { useDispatch } from "react-redux";
import {
  createList,
  selectList,
  updateList,
} from "@/features/lists/ducks/listsSlice";
import { NEW_LIST_NAME } from "@/features/tasks/ducks/constants";
import { IList } from "@/constants/types/listsTypes";
import { ListHeader } from "./components/ListHeader";
import { ListFooter } from "./components/ListFooter";
import _orderBy from "lodash/orderBy";
import {
  GroupList,
  selectorListsAndGroupLists,
} from "./ducks/selectors/selectorListsAndGroupLists";
import { ListSection } from "@/features/lists/components/ListSection";
import { ListContent } from "@/features/lists/components/ListContent";

const Lists = () => {


  useEffect(() => {
    console.log("test:rerended");
  });





  const syncDocumentTitle = (name?: string) => {

  };





  return (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-light"
      style={{ width: 350 }}
      id="list"
    >
      <ListHeader />
      <ListContent/>
    </aside>
  );
};

export { Lists };
