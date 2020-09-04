import React from 'react';

const DataSource = {
  getComments () {
    return [
      { name: 'comment 1', id: 1 },
      { name: 'comment 2', id: 2 },
    ]
  }
}
export class CommentList extends React.Component<any, any> {
  state = {
    // 假设 "DataSource" 是个全局范围内的数据源变量
    comments: DataSource.getComments()
  };
  render() {
    return (
      <div>
        <ul>
          {
          this.state.comments.map((comment) => (
            <li key={comment.id} > { comment.name } </li>
          ))
          }
        </ul>
      </div>
    );
  }
}