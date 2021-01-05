import React, { useState, useEffect } from "react";
// @ts-ignore
import { MenuBar } from "@/components"
import { useLocation } from 'umi'

export default (props: any) => {
  const location = useLocation();
  const paths = ['/', '/orders', '/users']
  return (
    <div className={'menu-bar'}>
      <div>
        { props.children }
      </div>
      <MenuBar
        show={paths.includes(location.pathname)}
        pathname={location.pathname}
      >
      </MenuBar>

      {/*<header>header layout</header>*/}
      {/*<section>*/}
      {/*  { props.children }*/}
      {/*</section>*/}
      {/*<MenuBar />*/}
    </div>
  );
}

