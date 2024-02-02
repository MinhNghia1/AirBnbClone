import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaPlane } from "react-icons/fa";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../../Apis/user";
import { IoArrowBackSharp } from "react-icons/io5";
export default function MenuUser() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { currentUser } = useSelector((state) => {
    return state.auth;
  });

  const handlegetUser = async (id) => {
    try {
      const resp = await getUserId(id);
      setAvatar(resp.avatar);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    handlegetUser(currentUser.user.id);
  }, []);
  const handleLogout = () => {
    setAnchorEl(null);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, SigOut!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("currenuser");
        navigate("/");
        window.location.reload();
      }
    });
  };
  const handleManageUser = () => {
    setAnchorEl(null);

    navigate("/admin/ManageUser");
  };
  const handleInfoUser = () => {
    setAnchorEl(null);
    navigate(`/personal-info/${currentUser.user.id}`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleInFoBookingRoom = () => {
    setAnchorEl(null);
    navigate(`/BookingRoom/${currentUser.user.id}`);
  };
  const handleBackHome = () => {
    setAnchorEl(null);
    navigate("/");
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {avatar ? (
              <img
                style={{ width: "32px", height: "32px", borderRadius: "90px" }}
                src={avatar}
                alt="avatar"
              />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>m</Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleInfoUser}>
          <Avatar />
          Thông Tin Cá Nhân
        </MenuItem>
        <MenuItem onClick={handleInFoBookingRoom}>
          <FaPlane
            fontSize={25}
            color="#FFFFFF"
            style={{
              marginRight: "8px",
              marginLeft: "-4px",
              padding: "4px 4px 4px 4px",
              borderRadius: "90px",
              backgroundColor: "#BDBDBD",
            }}
          />
          Chuyến Đi
        </MenuItem>
        <Divider />
        {currentUser.user.role === "ADMIN" && (
          <MenuItem onClick={handleManageUser}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            Trang Quản Lý
          </MenuItem>
        )}

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleBackHome}>
          <ListItemIcon>
            <IoArrowBackSharp fontSize="small" />
          </ListItemIcon>
          BackHome
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
