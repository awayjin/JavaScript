// console.log('from index.tsx')
import { IRouteComponentProps } from 'umi'
import { history } from 'umi';
import ErrorBoundary from "@/components/ErrorBoundary"; // 错误边界
import React from "react";

export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  // return children
  // console.log('history:', history)
  return <ErrorBoundary>{ children }</ErrorBoundary>
}
