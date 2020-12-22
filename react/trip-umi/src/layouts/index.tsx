import React, { useState, useEffect } from "react";
import { MenuBar } from '@/components'

export default (props: any) => {
  return (
    <div style={{ padding: 20 }}>
      <header>header layout</header>
      <section>
        { props.children }
      </section>
      <MenuBar />
    </div>
  );
}
