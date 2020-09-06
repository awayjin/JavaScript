import React from 'react';
// 从Mixin到HOC再到Hook https://juejin.im/post/6844903815762673671
const DataSource = {
  comments: [
    { name: 'comment 1', id: 1 },
    { name: 'comment 2', id: 2 },
  ],
  getComments () {
    return this.comments;
  }
}
export class CommentList extends React.Component<any, any> {
  state = {
    // 假设 "DataSource" 是个全局范围内的数据源变量
    comments: DataSource.getComments(),
    comment: 'comment default',
  };
  onChange = (e: any) => {
    console.log('state:', this.state)
    console.log('value:', e.target.value)
    const { value } = e.target
    this.setState({ comment: value})
  }
  onClickAddComment = () => {
    const {comments, comment} = this.state
    const newComponent = {
      name: comment,
      id: +new Date()
    }
    DataSource.comments.push(newComponent)
    console.log('DataSource.comments', DataSource.comments)
    console.log('DataSource', DataSource.getComments())
    this.setState({
      // comments: [...comments, newComponent]
      comments: DataSource.getComments()
    })
  }
  componentDidMount() {
    // 订阅变化
    // DataSource.add
  }

  render() {
    const { comment} = this.state
    return (
      <div>
        <div>
          <input type="text" value={comment} onChange={this.onChange}/>
          <button type='submit' onClick={this.onClickAddComment}>submit</button>
        </div>
        <ul>
          {
          this.state.comments.map((comment) => (
            <li key={comment.id} >{comment.id} { comment.name } </li>
          ))
          }
        </ul>
      </div>
    );
  }
}
