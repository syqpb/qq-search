import { useFetch } from "../hooks/useFetch";
import { fetchUser, IUser } from "../services/qq";
/**
 * 搜索用户
 * @returns {Promise<any>}
 */
export function useQQ() {
  const { data, state, onChangeParams } = useFetch<IUser>(fetchUser,{} as IUser);
  /**
   * 
   * @param qq 
   */
  const onSearch = (qq: any) => {
    onChangeParams({qq});
  };
  return { data, state, onSearch };
}
