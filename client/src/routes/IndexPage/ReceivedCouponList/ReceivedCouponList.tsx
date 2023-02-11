import styles from "./ReceivedCouponList.module.scss";
import useCouponService from "@services/couponService/useCouponService";

const ReceivedCouponList = () => {
  const { couponService } = useCouponService();
  const { data: receivedCouponListData } = couponService.queryReceivedList();

  return (
    <div>
      <h1>사용할 수 있는 쿠폰</h1>
      <div className={styles.wrapper}>
        {receivedCouponListData?.map((receivedCoupon) => (
          <div key={receivedCoupon.id}>
            {`${receivedCoupon.title}${" "}`}
            {`/ 발급일: ${receivedCoupon.issuedAt}${" "}`}
            {`/ 사용 여부: ${receivedCoupon.isUsed}${" "}`}
            {`/ 만료일: ${receivedCoupon.expiredAt}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedCouponList;
