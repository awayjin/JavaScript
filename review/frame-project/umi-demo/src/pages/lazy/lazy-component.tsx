import React from 'react';

interface IProps {
  id?: number;
}
const LazyComponent: React.FC<IProps> = ({
  id
}) => {
  return (
    <div>
      lazy component
    </div>
  )
}

export default LazyComponent;
