import React from "react";
import Header from "../components/Header";

const User = () => {
    const arr=[]
  return (
    <section className="section w-full">
      <Header
        title={"Users"}
        titleArr={arr.length}
        btnText={"Create User"}
        link={"/users/new"}
      />
    </section>
  );
};

export default User;
