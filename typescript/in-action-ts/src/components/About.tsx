import * as React from 'react'

// class About extends React.Component {
//
// }

interface PropsAbout {
  title: string;
  msg: string
}

const About = (props: PropsAbout) => {
  return (
    <div>
      <h2>About, {props.title}</h2>
      <em>msg, {props.msg}</em>
    </div>
  )
}


export default About