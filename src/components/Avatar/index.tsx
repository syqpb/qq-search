import React, { FC } from "react";
import styles from './index.module.css';
type IAvatorProps = {
    src: string;
    alt: string;
    size?: number;
    qq: string;
    nickname: string;
}


const Avatar:FC<IAvatorProps> = ({src,alt,qq,nickname}) => {
  return <div className={styles.avatar}>
    <img src={src} alt={alt} className={styles.img}/>
    <div className={styles.right}>
        <span>{qq}</span>
        <span>{nickname}</span>
    </div>
  </div>;
};

export default React.memo(Avatar);
