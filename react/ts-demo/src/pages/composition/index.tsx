import React from 'react'
import './index.css'

// 组件组合： https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html

function Container (props: any) {
  console.log('props:', props)
  return (
    <div className="container">
      -{ props.head }
      <br/>
      - { props.children }
    </div>
  )
}

function SwitchTab(props: any) {
  const obj = { a: 111 }
  const changeObj = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props.onOkSwitch(obj)
  }
  return <div onClick={changeObj}>switch</div>
}

function LeftTree() {
  return <div>LeftTree</div>
}
function RightContent () {
  return <div>RightContent</div>
}

export function Composition () {
  function onOkSwitch (switchData: any) {
    console.log('switchData:', switchData)
  }
  const st = <SwitchTab onOkSwitch={onOkSwitch}  />
  return (
    <>
      <Container head={ st }>
        <LeftTree></LeftTree>
        <RightContent></RightContent>
      </Container>
    </>
  )
}

// function FancyBorder (props: any) {
//   return (
//     <>
//       <div className="left">{ props.left }</div>
//       <div className={ 'facny-' + props.color }>
//         { props.children }
//       </div>
//     </>
//   )
// }
//
// function Left() {
//   return <div> left </div>;
// }
//
// function Contacts() {
//   return <div className="Contacts"> Contacts</div>;
// }
//
// function WelcomeDialog () {
//
//   return (
//     <FancyBorder color="blue" left={<Left />}>
//       <h2>WelcomeDialog</h2>
//       <p>Thank you for visiting our spacecraft!</p>
//     </FancyBorder>
//   )
// }
//
// export function Composition () {
//   return (
//     <>
//      <WelcomeDialog></WelcomeDialog>
//     </>
//   )
// }