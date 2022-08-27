import React from "react";
import Icons from "../../components/AppIcons";
import GroupItem from "./GroupItem";
import ListItem from "./ListItem";

const List = () => {
  return (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-light"
      style={{ width: "380px" }}
      id="list"
    >
      <header>
        <div className="navbar py-3 pb-0">
          <div className="d-flex align-items-center w-100 px-3">
            <span className="navbar-brand ">
              <span className="account-icon">
                <Icons.User className="text-white" />
              </span>
            </span>
            <div className="navbar-nav flex-grow-1 text-truncate">
              <span title="Maxim" className="fa-x fw-bold text-truncate">
                Maxim
              </span>
              <span
                title="test@gmail.com"
                className="fa-sm lh-base text-muted text-truncate"
              >
                test@gmail.com
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center w-100 px-3 my-2">
            <input
              className="form-control form-control-sm "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Icons.Search className="form-control-after-search" />
          </div>
          <hr className="w-100 m-0" />
        </div>
      </header>
      <section className="flex-grow-1 overflow-auto">
        <div className="w-100">
          <ul className="list-group list-group-flush">
            <ListItem name={"My day"} Icon={<Icons.MyDay/>} />
            <ListItem name={"Important"} Icon={<Icons.Favorite/>}/>
            <ListItem name={"Planned"} Icon={<Icons.Planned/>}/>
            <ListItem name={"All"} Icon={<Icons.All/>}/>
            <ListItem name={"Tasks"} Icon={<Icons.Task/>} />
          </ul>
          <hr className="w-100 m-0" />
          <ul className="list-group list-group-flush">
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />

            <GroupItem name="1">
              {
                <ul className="list-group list-group-flush">
                  <ListItem isSubItem={true} />
                  <ListItem isSubItem={true} />
                  <ListItem isSubItem={true} />
                </ul>
              }
            </GroupItem>
            <GroupItem name="1">
              {
                <ul className="list-group list-group-flush">
                  <ListItem />
                  <ListItem />
                  <ListItem />
                </ul>
              }
            </GroupItem>
            <GroupItem name="1">
              {
                <ul className="list-group list-group-flush">
                  <ListItem />
                  <ListItem />
                  <ListItem />
                </ul>
              }
            </GroupItem>
          </ul>
        </div>
      </section>
      <footer>
        <div className="border-top mt-auto d-flex justify-content-between align-items-center ">
          <Icons.Plus title="Add a list" className="fs-5 p-3" />
          <div className="flex-grow-1">
            <span className="pointer">New list</span>
          </div>
          <Icons.NewGroup title="Create a new group" className="fs-5 p-3" />
        </div>
      </footer>
    </aside>
  );
};

export default List;
