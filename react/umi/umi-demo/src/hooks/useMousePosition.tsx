import {useEffect, useState} from "react";

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0});
  useEffect(() => {
    console.log('add', position.x)
    const mouseEvent = (e: MouseEvent) => {
      console.log('inner:', position);
      setPosition({x: e.clientX, y: e.clientY});
    }
    window.addEventListener('click', mouseEvent)
    return () => {
      console.log('remove', position.x)
      window.removeEventListener('click', mouseEvent)
    }
  });
  return position
}
