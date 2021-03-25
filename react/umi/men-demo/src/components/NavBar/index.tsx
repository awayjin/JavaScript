import React, { FC, useEffect } from 'react';
import { NavBar as AntNAvBar } from 'antd-mobile';
import leftImg from '@/images/left-arrow@2x.png';
import shareImg from '@/images/share@2x.png';
import { hideTitleBar } from '@/utils/jsBridge';
import { isFunction } from '@/utils';
import { isInZhuzher } from '@/utils/env';
import styles from './index.less';

interface IProps {
  fixed?: boolean;
  prefixCls?: string;
  className?: string;
  mode?: 'dark' | 'light';
  icon?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onLeftClick?: () => void;
  onShare?: () => void;
  hideNativeTitleBar?: boolean; // 隐藏住这儿的title bar
  hideNotInZZE?: boolean; // 只在住这儿里面显示
}

const NavBar: FC<IProps> = props => {
  const {
    fixed = true,
    prefixCls,
    className = '',
    mode,
    icon,
    leftContent,
    rightContent,
    onLeftClick,
    onShare,
    hideNativeTitleBar = true,
    hideNotInZZE = false,
  } = props;

  const onLeftArrowClick = () => {
    if (isFunction(onLeftClick)) {
      onLeftClick();
    }
    // goBack(onLeftClick);
  };

  useEffect(() => {
    if (hideNativeTitleBar) {
      hideTitleBar();
    }
  }, [hideNativeTitleBar]);

  if (hideNotInZZE) {
    if (isInZhuzher) {
      return null;
    }
  }

  return (
    <div className={styles['nav-bar-wrapper']}>
      <AntNAvBar
        prefixCls={prefixCls}
        className={`${className} ${fixed ? styles['nav-bar-fixed'] : ''}`}
        mode={mode}
        icon={
          icon || (
            <img className={styles['left-img']} alt="返回" src={leftImg} />
          )
        }
        leftContent={leftContent}
        onLeftClick={onLeftArrowClick}
        rightContent={
          rightContent || (
            <img
              onClick={() => {
                if (isFunction(onShare)) {
                  onShare();
                }
              }}
              className={styles['share-img']}
              alt="分享"
              src={shareImg}
            />
          )
        }
      />
      {fixed && <div className={styles['nav-bar-placeholder']} />}
    </div>
  );
};
export default NavBar;
