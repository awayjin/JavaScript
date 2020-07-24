import React from 'react'
import './index.css'

// 组件组合： https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html
function FancyBorder (props: any) {
  return (
    <>
      <div className="left">{ props.left }</div>
      <div className={ 'facny-' + props.color }>
        { props.children }
      </div>
    </>
  )
}

function Left() {
  return <div> left </div>;
}

function Contacts() {
  return <div className="Contacts"> Contacts</div>;
}

function WelcomeDialog () {
  
  return (
    <FancyBorder color="blue" left={<Left />}>
      <h2>WelcomeDialog</h2>
      <p>Thank you for visiting our spacecraft!</p>
    </FancyBorder> 
  )
}

export function Compotion () {
  return (
    <>
     <WelcomeDialog></WelcomeDialog>
    </>
  )
} 