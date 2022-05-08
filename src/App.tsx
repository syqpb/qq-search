import React, { useEffect, useMemo } from "react";
import "./App.css";
import Search from "./components/Search";
import Loading from "./components/Loading";
// import { Toast } from './components/Toast';
import Avatar from "./components/Avatar";
import { useQQ } from "./models/useQQ";
import { debounce } from "lodash-es";
function App() {
  const { data, state, onSearch } = useQQ();

  const onSearchQQ = debounce((qq: string) => {
     onSearch(qq);
  }, 500);
  useEffect(() => {
    if (data?.msg) {
      console.log(data.msg);
    }
  }, [data]);
  /**
   * 加载占位符
   */
  const placeholder = useMemo(() => {
    if (state.isLoading || state.isError) {
      return <Loading />;
      // eslint-disable-next-line no-mixed-operators
    } else if (state.isError || (data && data.code !== 1)) {
      return data?.msg || "Error";
    } else if (data && data.code === 1) {
      return (
        <Avatar
          src={data?.qlogo}
          alt={data?.qq}
          qq={data?.qq}
          nickname={data?.name}
        />
      );
    }
  }, [state, data]);

  return (
    <div className="App">
      <h1>QQ号查询</h1>
      <Search onSearch={onSearchQQ}>{placeholder}</Search>
    </div>
  );
}

export default App;
