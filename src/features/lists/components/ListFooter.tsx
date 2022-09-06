import Icons from "@/components/AppIcons";
import React from "react";

type Props = {
  handleListCreation: () => void;
};

const ListFooter = ({ handleListCreation }: Props) => {
  return (
    <footer>
      <div className="border-top mt-auto d-flex justify-content-between align-items-center ">
        <button
          className="btn d-flex align-items-center flex-grow-1 m-1 p-2"
          onClick={handleListCreation}
        >
          <Icons.Plus title="Add a list" className="fs-5 pe-2" />
          <div className="">
            <span className="pointer">New list</span>
          </div>
        </button>

        <button type="button" className="btn m-1 p-2">
          <Icons.NewGroup title="Create a new group" className="fs-5" />
        </button>
      </div>
    </footer>
  );
};

export { ListFooter };