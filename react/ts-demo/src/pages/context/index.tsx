import React from 'react';
import { ToggleProvider } from './toggleContext'
import {Pannel} from './panel'
// 简介： https://juejin.im/post/5c87c1b4f265da2dc453b6d6

export function ContextPage() {
  return (
    <ToggleProvider>
      <Pannel></Pannel>
    </ToggleProvider>
  );
}


