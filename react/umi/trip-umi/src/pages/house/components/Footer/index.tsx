// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Modal } from '@/components';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';

export default function (props) {
  const [show, setShow] = useState(false);
  const [commentsValue, setCommentsValue] = useState();
  // const { house: { addCommentsAsync } } = useStoreHook();

  const handleClick = () => {
    setShow(true)
  };

  const handleChange = (value) => {
    // console.log(value)
    setCommentsValue(value);
  };

  const handleClose = () => {
    setShow(false)
  };

  const handleSubmit = () => {
    // if(commentsValue){
    //   handleClose();
    //   addCommentsAsync({
    //     comment: commentsValue
    //   });
    // }else {
    //   Toast.fail('请添加信息');
    // }
  };

  useEffect(() => {

  }, [])

  return (
    <>
      <div className='footer' onClick={handleClick}>
        评论~
      </div>
      <Modal
        show={show}
        styleBody={{
          height: '220px',
          bottom: '0px',
          top: 'unset'
        }}
        onClose={handleClose}
      >
        <div className='modal-comment'>
          <TextareaItem
            rows={2}
            count={200}
            onChange={handleChange}
          />
          <Button className='comment-btn' type='warning' onClick={handleSubmit}>评论</Button>
        </div>
      </Modal>
    </>
  )
}
