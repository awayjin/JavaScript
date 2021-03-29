// @ts-nocheck
import React, { useState, useEffect } from "react";
import { MenuBar } from "@/components"
import { useLocation } from 'umi'
import { StoreProvider } from 'think-react-store'
import * as store from '../stores'

export default (props: any) => {
  const location = useLocation();
  const paths = ['/', '/orders', '/users']
  // console.log('location', location)
  return (
    <StoreProvider store={store}>
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
    </StoreProvider>
  );
}

