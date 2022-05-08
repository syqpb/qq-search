import React, { FC, useMemo, useState } from "react";
import styles from "./index.module.css";
import { isQQ } from "../../utils";
import classNames from "classnames";

type SearchProps = {
  onSearch: (qq: string) => void;
  children: React.ReactNode;
};

const Search: FC<SearchProps> = ({ onSearch, children }) => {
  //   const [value, setValue] = React.useState("");
  const [isValideQQ, setIsValideQQ] = useState(false); //是否是有效的QQ号
  const [isTouched, setIsTouched] = useState(false); // 是否触发过
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    setIsValideQQ(isQQ(e.target.value));
    isQQ(e.target.value) && onSearch(e.target.value);
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(false);

    isQQ(e.target.value) && setIsValideQQ(true);
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // setIsTouched(true);
  };
  const clsTouched = useMemo(() => {
    return classNames({
      isTouched: isTouched,
      isNotTouched: !isTouched,
    });
  }, [isTouched]);
  const clsError = useMemo(() => {
    return classNames({
      isError: !isValideQQ,
      isValided: isValideQQ,
    });
  }, [isValideQQ]);

  return (
    <div className={styles.search}>
      <div>
        <label htmlFor="qq">QQ</label>
        <input
          type="text"
          placeholder="Search"
          id="qq"
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
      <div className={`${styles[clsTouched]} ${styles[clsError]}`}>
        请输入合法qq号码
      </div>
      <div className={styles.avatar}>{children}</div>
    </div>
  );
};

export default React.memo(Search);
