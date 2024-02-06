import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeedbacks, postFeedbacks } from "../../../../Apis/feedback";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import styled from "./Feedback.module.scss";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
export default function Feedback({ roomId, onGetFeedbacks }) {
  const queryClient = useQueryClient();
  const currentUser = useSelector((state) => state.auth.currentUser);
  // Thông tin user
  const user = currentUser?.user;
  // console.log(user,"dkfsjsdlf");
  // Ngày comment
  const dayComment = dayjs().format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
  // input form
  const {
    handleSubmit,
    register,
    control,
    formState: setValue,
  } = useForm({
    defaultValues: {
      noiDung: "",
      saoBinhLuan: 0,
    },
  });

  // Lấy feedbacks từ API
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getFeedbacks(roomId),
  });

  // Gọi API post comments
  const { mutate: onSuccess } = useMutation({
    mutationFn: (valuesForm) => {
      const values = {
        id: user.id,
        maPhong: roomId,
        maNguoiBinhLuan: user.id,
        ngayBinhLuan: dayComment,
        noiDung: valuesForm.noiDung,
        saoBinhLuan: valuesForm.saoBinhLuan,
      };
      return postFeedbacks(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setValue("noiDung", "");
      setValue("saoBinhLuan", 0);
    },
  });
  useEffect(() => {
    if (feedbacks.length > 0) {
      onGetFeedbacks(feedbacks);
    }
  }, [feedbacks, onGetFeedbacks]);

  return (
    <div className={styled.feedback}>
       <div className={styled.feedback}
       <div className="styled">>
        {feedbacks.map((feedback, index) => (
          <div key={index} item md={6} sx={{ marginBottom: "50px"}} className={styled.flexContent}
          g>
            <div className={styled.feedbackItem}>
              <img
                style={{ borderRadius: "10px" }}
                src={feedback.avatar || "https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-1/404931285_3568833133329150_7685244699268670578_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFWqGgOizBCrBmF1XQWrkhNb3ARluray7RvcBGW6trLtOH0lpff907-sjIbSnZuzzOU2LN9UlWFyAV4UT6XYPbj&_nc_ohc=GrjU8Xe0guoAX8jD82j&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfBDif0Q4OzoxO9mL1nOLB2ZcGNxeZCDROfd1bYqQvdobg&oe=65BA636B"}
                alt=""
              />
              <div className={styled.feedbackDetail}>
                <Typography
                  sx={{
                    fontSize: "18px",
                  }}
                >
                  {feedback.tenNguoiBinhLuan}
                </Typography>
                <Typography sx={{ fontSize: "15px", color: "gray" }}>
                  {dayjs(feedback.ngayBinhLuan).format("MM/YYYY")}
                </Typography>
                <Rating
                  name="read-only"
                  readOnly
                  value={feedback.saoBinhLuan}
                  sx={{ fontSize: "15px" }}
                />
              </div>
            </div>
            <div className={styled.feedbackDesc}>
              <Typography>{feedback.noiDung}</Typography>
            </div>
          </div>
        ))}
      </div>
      <Button
        sx={{ fontWeight: "500", fontSize: "16px", marginBottom: "50px" }}
        variant="outlined"
      >
        Hiển thị tất cả đánh giá
      </Button>

      {/* Kiểm tra User  */}
      {user && (
        <Box
          component="form"
          onSubmit={handleSubmit(onSuccess)}
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className={styled.addComment}>
            <img
              style={{ borderRadius: "10px" }}
              width={50}
              height={50}
              src={user.avatar || "https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-1/404931285_3568833133329150_7685244699268670578_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFWqGgOizBCrBmF1XQWrkhNb3ARluray7RvcBGW6trLtOH0lpff907-sjIbSnZuzzOU2LN9UlWFyAV4UT6XYPbj&_nc_ohc=GrjU8Xe0guoAX8jD82j&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfBDif0Q4OzoxO9mL1nOLB2ZcGNxeZCDROfd1bYqQvdobg&oe=65BA636B"}
              alt=""
            />
            <TextField
              id="comment"
              label="Bình luận"
              multiline
              fullWidth
              rows={4}
              name="noiDung"
              {...register("noiDung")}
            />
          </div>
          <div className={styled.btnAddComment}>
            <Typography component="legend" sx={{ paddingLeft: "5px" }}>
              Đánh giá sao
            </Typography>
            <Controller
              name="saoBinhLuan"
              control={control}
              render={({ field }) => (
                <Rating
                  sx={{ paddingBottom: "15px", fontSize: "30px" }}
                  {...field}
                />
              )}
            />
            <Button sx={{ display: "block" }} variant="contained" type="submit">
              Thêm bình luận
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}
