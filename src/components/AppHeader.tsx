import { Header } from "antd/lib/layout/layout";
import { Menu } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store/actions/userActions";
import { AppState } from "../store";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const { data, loading } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const { pathname } = useLocation();
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        {data.username ? (
          <>
            <Menu.Item key="/records">
              <Link to="/records">Expense Records</Link>
            </Menu.Item>

            <Menu.Item key="/categories">
              <Link to="/categories">Category</Link>
            </Menu.Item>

            <Menu.Item key="/logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </>
        ) : loading ? null : (
          <Menu.Item key="/login">
            <Link to="/logout">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
