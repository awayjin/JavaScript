import React, {createContext, useState, useContext, Suspense} from 'react';
// import LazyComponent from "@/pages/lazy/lazy-component";
const LazyComponent = React.lazy(() => import('./lazy-component'));

export default function Demo(props: any) {
  const [list, setList] = useState([
    {id: 1, name: 'Fragment 1'},
    {id: 2, name: 'name2'},
  ])
  const [show, setSHow] = useState(false)
  return (
    <div>
      <div>
        {
          show ? (
            <Suspense fallback={<div>loading...</div>}>
              <LazyComponent></LazyComponent>
            </Suspense>
          ) : null
        }
        <button onClick={() => setSHow(!show)}>switch lazy</button>
      </div>
      <div>
        {
          list.map(item => {
            return <React.Fragment key={item.id}>{item.name}</React.Fragment>
          })
        }
      </div>
    </div>
  );
}

