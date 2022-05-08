import { useFetch } from "../hooks/useFetch";
import { fetchUser } from "../services/qq";
/**
 * 搜索用户
 * @returns {Promise<any>}
 */
export function useQQ() {
  const { data, state, onChangeParams } = useFetch(fetchUser);
  const onSearch = (qq: any) => {
    onChangeParams({qq});
  };
  return { data, state, onSearch };
}
