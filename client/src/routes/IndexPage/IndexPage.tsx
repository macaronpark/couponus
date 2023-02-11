import { useEffect } from "react";
import useCouponService from "../../services/couponService/useCouponService";
import styles from "./IndexPage.module.css";
import IssuedCouponList from "./IssuedCouponList";
import ReceivedCouponList from "./ReceivedCouponList";

const IndexPage = () => {
  const { couponService } = useCouponService();
  const mutate = couponService.issue();

  useEffect(() => {
    if (mutate.data) console.log(mutate.data);
  }, [mutate.data]);

  const handleClick = () => {
    console.log("handleClick");
    mutate.mutate({
      userId: "user-szpark",
      title: "test",
      desc: "test-desc",
      expiredAt: "2099-02-11T07:27:35.928Z",
      receiverId: "user-hcmoon",
    });
  };

  return (
    <div>
      <IssuedCouponList />
      <ReceivedCouponList />
      <button onClick={handleClick}>쿠폰 발급</button>
    </div>
  );
};

export default IndexPage;
