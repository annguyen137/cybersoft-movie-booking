import React, { useEffect, useRef } from "react";
import { Button, Layout, Dropdown, Space, Menu } from "antd";
import { UserOutlined, LogoutOutlined, RightSquareOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { moviesRef } from "pages/Home/MovieShowing/MovieShowing";
import { theatersRef } from "pages/Home/TheaterTabs/TheaterTabs";
import { appRef } from "pages/Home/AppInfo/AppInfo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/slices/authSlice";
import { resetAccountReducer } from "redux/slices/accountSlice";
import { resetTicketsReducer } from "redux/slices/ticketsSlice";
import { resetAdminReducer } from "redux/slices/adminSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => {
    return state.auth;
  });

  return (
    <Layout.Header
      className="fixed top-0 w-screen max-w-screen my-auto z-50 bg-white shadow-sm shadow-slate-400"
      style={{ marginRight: "10px" }}
    >
      <div className="container h-full w-full flex justify-between items-center p-4 text-lg">
        <NavLink
          to="/"
          onClick={() => {
            window.scrollTo({ behavior: "smooth", top: 0 });
          }}
        >
          <img src="../icon-tixjpg.jpg" width={30} alt="logo" />
        </NavLink>
        <ul className="m-0 hidden lg:flex text-orange-600">
          <li>
            <NavLink
              to="/"
              className=" px-4 hover:text-orange-600 text-black -mb-1 border-b-2 dark:border-transparent"
              onClick={() => {
                moviesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Lịch chiếu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="px-4 hover:text-orange-600 text-black border-b-2 dark:border-transparent"
              onClick={() => {
                theatersRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Cụm Rạp
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="px-4 hover:text-orange-600 text-black border-b-2 dark:border-transparent">
              Tin Tức
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="px-4 hover:text-orange-600 text-black border-b-2 dark:border-transparent"
              onClick={() => {
                appRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Ứng dụng
            </NavLink>
          </li>
        </ul>
        {Object.keys(currentUser).length ? (
          <div className="items-center hidden flex-shrink-0 md:flex">
            <div title="Tài khoản">
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu
                    theme="light"
                    className="mt-4 border border-slate-400 shadow-xl"
                    items={[
                      {
                        key: "1",

                        className: "font-bold text-lg",
                        label: currentUser.taiKhoan,
                      },
                      {
                        key: "2",
                        label: (
                          <Link to={currentUser.maLoaiNguoiDung === "KhachHang" ? "/user/profile" : "/admin/profile"}>
                            Trang cá nhân
                          </Link>
                        ),
                        icon: <RightSquareOutlined />,
                      },
                      {
                        key: "3",
                        label: (
                          <Button
                            onClick={() => {
                              dispatch(logout());
                              dispatch(resetAccountReducer());
                              dispatch(resetTicketsReducer());
                              dispatch(resetAdminReducer());
                            }}
                          >
                            Đăng xuất
                          </Button>
                        ),
                      },
                    ]}
                  />
                }
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <UserOutlined className="p-3 rounded-full border-2 bg-slate-300 text-black hover:border-slate-500 transition-colors duration-500" />
                  </Space>
                </a>
              </Dropdown>
              {/* <p className="m-0 p-2 bg-orange-200 rounded-md hover:cursor-pointer">{currentUser.taiKhoan}</p> */}
            </div>
            <Button
              title="Đăng xuất"
              className="flex items-center border-orange-600 hover:bg-orange-600 hover:text-white mx-1 text-lg rounded-md focus:text-orange-600"
              onClick={() => dispatch(logout())}
            >
              <LogoutOutlined />
            </Button>
          </div>
        ) : (
          <div className="items-center hidden flex-shrink-0 md:flex">
            <Button
              className="flex items-center bg-orange-50 border-orange-600 hover:text-orange-600 mx-1 text-lg rounded-md focus:text-orange-600"
              onClick={() => navigate("/login")}
            >
              <UserOutlined />
              Đăng nhập
            </Button>
            <Button
              className="flex items-center bg-orange-50 border-orange-600 hover:text-orange-600 mx-1 text-lg rounded-md focus:text-orange-600"
              onClick={() => navigate("/register")}
            >
              <UserOutlined />
              Đăng ký
            </Button>
          </div>
        )}
        {/* BUTTON SHOW WHEN BELOW MD SCREEN */}
        <div className=" md:hidden">
          {Object.keys(currentUser).length ? (
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu
                  theme="light"
                  className="mt-4 border border-slate-400 shadow-xl"
                  items={[
                    {
                      key: "1",

                      className: "font-bold text-lg",
                      label: currentUser.taiKhoan,
                    },
                    {
                      key: "2",
                      label: (
                        <Link to={currentUser.maLoaiNguoiDung === "KhachHang" ? "/user/profile" : "/admin/profile"}>
                          Trang cá nhân
                        </Link>
                      ),
                      icon: <RightSquareOutlined />,
                    },
                    {
                      key: "3",
                      label: (
                        <Button
                          onClick={() => {
                            dispatch(logout());
                            dispatch(resetAccountReducer());
                            dispatch(resetTicketsReducer());
                            dispatch(resetAdminReducer());
                          }}
                        >
                          Đăng xuất
                        </Button>
                      ),
                    },
                  ]}
                />
              }
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined className="p-3 rounded-full border-2 bg-slate-300 text-black hover:border-slate-500 transition-colors duration-500" />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Dropdown
              trigger={["click"]}
              arrow
              placement="bottomLeft"
              overlay={
                <Menu
                  theme="light"
                  className="mt-4 border border-slate-400 shadow-xl"
                  items={[
                    {
                      key: "1",
                      label: (
                        <Button
                          className="flex items-center justify-center w-full bg-orange-50 border-orange-600 hover:text-orange-600 mx-1 text-lg rounded-md focus:text-orange-600"
                          onClick={() => navigate("/login")}
                        >
                          <UserOutlined />
                          Đăng nhập
                        </Button>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <Button
                          className="flex items-center justify-center w-full bg-orange-50 border-orange-600 hover:text-orange-600 mx-1 text-lg rounded-md focus:text-orange-600"
                          onClick={() => navigate("/register")}
                        >
                          <UserOutlined />
                          Đăng ký
                        </Button>
                      ),
                    },
                    {
                      key: "3",
                      label: (
                        <Button type="dashed" className="w-full mx-1 rounded-md" onClick={() => navigate("/")}>
                          Về trang chủ
                        </Button>
                      ),
                    },
                  ]}
                />
              }
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button className=" border-orange-600 hover:text-orange-600 text-orange-600 focus:text-orange-600">
                  =
                </Button>
              </a>
            </Dropdown>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
