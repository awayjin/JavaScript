import React from 'react';

function Id(props: any) {
  console.log(props)
  console.log(props?.match.params)
  return (
    <div>
      <h1>$id 动态路由</h1>
      <h2>{props?.match.params.id}</h2>
    </div>
  )
}

export default Id;
