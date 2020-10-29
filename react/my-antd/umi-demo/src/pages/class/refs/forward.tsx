import React from "react";

const inputForward = React.forwardRef((props: any, ref: any) => {
  console.log('props,,', props)
  return (
    <div>
      name: <input type="text" ref={ref} />
      {props.children}
    </div>
  )
})

export default inputForward

// const InputForward = (props: any, ref: any) => (
//   <button ref={ref}>
//     { props.children }
//   </button>
// )
//
// const ref = React.createRef()

// export default <InputForward ref={ref}>Click Me</InputForward>
