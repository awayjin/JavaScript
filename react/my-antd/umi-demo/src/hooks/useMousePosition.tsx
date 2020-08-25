import {useEffect, useState} from "react";

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0});
  useEffect(() => {
    console.log('add', position.x)
    const mouseEvent = (e: MouseEvent) => {
      console.log('inner:', position);
      setPosition({x: e.clientX, y: e.clientY});
    }
    document.addEventListener('mousemove', mouseEvent)
    return () => {
      console.log('remove', position.x)
      document.removeEventListener('mousemove', mouseEvent)
    }
  });
  return position
}
