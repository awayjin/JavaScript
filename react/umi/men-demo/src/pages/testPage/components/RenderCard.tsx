import React, { FC } from 'react';
import { useToggle, useMount } from 'ahooks';
import Skeleton from 'react-loading-skeleton';
import { WhiteSpace, Card, Toast } from 'antd-mobile';

const RenderCard: FC<{ title: string }> = ({ title, children }) => {
  const [loading, { toggle }] = useToggle(true);
  useMount(() => {
    // Toast.info('让骨架屏闪一会~', 2);
    // 让骨架屏闪一会~
    const timer = setTimeout(() => {
      toggle(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      {loading ? (
        <Skeleton height={100} />
      ) : (
        <Card>
          {title && <Card.Header title={title} />}
          <Card.Body>{children}</Card.Body>
        </Card>
      )}

      <WhiteSpace />
    </>
  );
};

export default RenderCard;
