import React, { useEffect, useState, useRef } from "react";
import styled from "./BookingRoom.module.scss";
import { Box, Typography, Modal, Stack, Snackbar, Alert } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingRoom, getRoomisBooked } from "../../../../Apis/room";
import { ModalContent } from "../../../../Components/Modal/index";
import { ButtonCustom, ButtonMain } from "../../../../Components/Button/Button";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { eachDayOfInterval, format, addDays } from 'date-fns';
// const filterReservedDates = (startDate, endDate, reservedDates) => {
//   // Tạo một danh sách các ngày đã đặt
//   const reservedDateSet = new Set(reservedDates.map(date => format(new Date(date), 'yyyy-MM-dd')));

//   // Tạo một khoảng thời gian từ startDate đến endDate
//   const interval = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });

//   // Lọc những ngày không bị trùng
//   const availableDates = interval.filter(date => !reservedDateSet.has(format(date, 'yyyy-MM-dd')));

export default function BookingRoom({
  roomId,
  price,
  averageRating,
  totalReviews,
}) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { data: ListOfRoomIsBooked = [] } = useQuery({
    queryKey: ["isBooked"],
    queryFn: getRoomisBooked,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const refCalendar = useRef(null);
  const queryClient = useQueryClient();
  const [count, setCount] = useState(1);
  const [countDays, setCountDays] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openStack, setOpenStack] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (value) => {
      const valueForm = {
        id: currentUser.user.id,
        maPhong: roomId,
        ngayDen: dayjs(selectionRange.startDate).format(),
        ngayDi: dayjs(selectionRange.endDate).format(),
        soLuongKhach: count,
        maNguoiDung: currentUser.user.id,
      };
      return bookingRoom(valueForm);
    },
    onSuccess: () => {
      setOpenStack(true);
      setOpenSuccess(false);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["isBooked"] });
      }, 500);
    },
  });

  const isBookingValid = () => {
    const isRoomAlreadyBooked = ListOfRoomIsBooked.some((booking) => {
      const bookingStartDate = dayjs(booking.ngayDen);
      const bookingEndDate = dayjs(booking.ngayDi);
      const selectionStartDate = dayjs(selectionRange.startDate);
      const selectionEndDate = dayjs(selectionRange.endDate);

      const isSelectionWithinBookingRange = selectionStartDate.isSame(bookingStartDate, 'day') || selectionStartDate.isBefore(bookingStartDate, 'day');
      const isSelectionEndWithinBookingRange = selectionEndDate.isSame(bookingEndDate, 'day') || selectionEndDate.isAfter(bookingEndDate, 'day');

      const isBookingWithinSelectionRange = bookingStartDate.isSame(selectionStartDate, 'day') || bookingStartDate.isAfter(selectionStartDate, 'day');
      const isBookingEndWithinSelectionRange = bookingEndDate.isSame(selectionEndDate, 'day') || bookingEndDate.isBefore(selectionEndDate, 'day');

      const isBookingInRange = isSelectionWithinBookingRange && isSelectionEndWithinBookingRange && isBookingWithinSelectionRange && isBookingEndWithinSelectionRange;

      return isBookingInRange;
    });

    console.log(isRoomAlreadyBooked);
    return isRoomAlreadyBooked;
  };

  const handleBooking = () => {
    if (isBookingValid()) {
      Swal.fire({
        icon: 'error',
        title: 'Đặt phòng không thành công!',
        text: 'Phòng đã được đặt hoặc thông tin đặt phòng không hợp lệ.'
      });
      queryClient.invalidateQueries({ queryKey: ["isBooked"] });
    } else {
      setOpenSuccess(true);
      Swal.fire({
        icon: 'success',
        title: 'Đặt phòng thành công!'
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["isBooked"] });
      }, 500);
    }
  };


  useEffect(() => {
    document.addEventListener("click", clickOutside, true);
    document.addEventListener("keydown", escKey, true);

    return () => {
      document.removeEventListener("click", clickOutside, true);
      document.removeEventListener("keydown", escKey, true);
    };
  }, []);

  const clickOutside = (e) => {
    if (refCalendar.current && !refCalendar.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const escKey = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    const startDate = new Date(ranges.selection.startDate);
    const endDate = new Date(ranges.selection.endDate);
    setCountDays(Math.abs((endDate - startDate) / (1000 * 60 * 60 * 24)));
  };

  const handleCountPlus = () => {
    setCount(count + 1);
  };

  const handleCountMinus = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const disabledRanges = ListOfRoomIsBooked.map((day) => {
    return { ngayDen: day.ngayDen, ngayDi: day.ngayDi };
  });

  function isDateInDisabledRange(date) {
    return disabledRanges.some((disabledRange) => {
      const start = new Date(disabledRange.ngayDen);
      const end = new Date(disabledRange.ngayDi);
      return date >= start && date <= end;
    });
  }

  const handleCloseStack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenStack(false);
  };

  return (
    <div className={styled.bookingRoom}>
      <div className={styled.bookingContent}>
        <div className={styled.bookingTitle}>
          <Typography sx={{ fontSize: "25px" }}>
            ${price}
            <span className={styled.priceOfNight}>/ đêm</span>
          </Typography>
          <p className={styled.averageRating}>
            <StarIcon sx={{ marginRight: "3px", fontSize: "17px" }} />{" "}
            {averageRating} ·
            <span className={styled.totalFeedback}>
              {totalReviews} đánh giá
            </span>
          </p>
        </div>
        <div className={styled.bookingDetail}>
          <Box
            sx={{
              display: "flex",
              border: "1px solid #B0B0B0",
              padding: "5px",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
            }}
          >
            <div onClick={() => setIsOpen(true)} className={styled.dateRight}>
              <Typography sx={{ fontSize: "11px", color: "#222222" }}>
                NHẬN PHÒNG
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#717171" }}>
                {dayjs(selectionRange.startDate).format("DD/MM/YYYY")}
              </Typography>
            </div>
            <div onClick={() => setIsOpen(true)} className={styled.dateLeft}>
              <Typography sx={{ fontSize: "11px", color: "#222222" }}>
                TRẢ PHÒNG
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#717171" }}>
                {dayjs(selectionRange.endDate).format("DD/MM/YYYY")}
              </Typography>
            </div>
          </Box>
          {isOpen && (
            <div ref={refCalendar} className={styled.wrapCalendar}>
              <DateRange
                ranges={[selectionRange]}
                onChange={handleSelect}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
                rangeColors={["#f33e5b"]}
                dateDisplayFormat="dd/MM/yyyy"
                disabledDay={(date) => isDateInDisabledRange(date)}
              />
            </div>
          )}

          <div className={styled.customerItem}>
            <div className={styled.customerRight}>
              <Typography sx={{ fontSize: "11px", color: "#222222" }}>
                KHÁCH
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#717171" }}>
                {count} khách
              </Typography>
            </div>
            <div className={styled.customerLeft}>
              <Typography onClick={handleCountPlus} sx={{ fontSize: "11px" }}>
                <AddCircleOutlineOutlinedIcon />
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#717171" }}>
                {count}
              </Typography>
              <Typography onClick={handleCountMinus} sx={{ fontSize: "11px" }}>
                <RemoveCircleOutlineOutlinedIcon />
              </Typography>
            </div>
          </div>
          <div className={styled.btnBookingItem}>
            <button
              onClick={handleBooking}
              type="submit"
              className={styled.btnBooking}
            >
              Đặt phòng
            </button>
          </div>
          <div className={styled.priceBeforeBooking}>
            <Typography sx={{ textDecoration: "underline", fontSize: "15px" }}>
              ${price} x {countDays} đêm
            </Typography>
            <Typography sx={{ textDecoration: "underline", fontSize: "15px" }}>
              {price * countDays}$
            </Typography>
            {count > 1 && (
              <Typography sx={{ textDecoration: "underline", fontSize: "15px" }}>
                + ${10 * (count - 1)}
              </Typography>
            )}
          </div>
          <div className={styled.totalPrice}>
            <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
              Tổng tiền
            </Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
              {price * countDays}$
            </Typography>
          </div>
        </div>
      </div>
      <Modal
        open={openSuccess}
        onClose={() => {
          setOpenSuccess(false);
        }}
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: " rgba(0, 0, 0, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "999",
        }}
      >
        <ModalContent>
          <img
            style={{ width: "120px", marginTop: "10px" }}
            src="https://i.pinimg.com/564x/e5/b9/81/e5b98110fcd62d6ebe0e636262170175.jpg"
            alt="confirm"
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "40px",
              color: " #f43f5e",
            }}
          >
            Bạn có chắc chắn đặt phòng ?
          </Typography>

          <ButtonMain onClick={() => mutate()}>Xác nhận</ButtonMain>
          <ButtonCustom
            onClick={() => {
              setOpenSuccess(false);
            }}
          >
            Hủy
          </ButtonCustom>
        </ModalContent>
      </Modal>
      <Stack spacing={2} sx={{ width: "300%" }}>
        <Snackbar
          open={openStack}
          autoHideDuration={1500}
          onClose={handleCloseStack}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleCloseStack}
            severity="success"
            sx={{ width: "300%" }}
          >
            Đặt phòng thành công!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
