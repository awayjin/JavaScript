import React, { PureComponent } from 'react';
import ListItems from './list-item'

class Lists extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: 'demo-old',
      count: 10,
      obj: {id: 1}
    }
  }

  
  render() {

    return (
      <>
        <div>
           <ListItems ></ListItems>
            <div>3</div>
         </div>
      </>
    );
  }
}


export default Lists;
