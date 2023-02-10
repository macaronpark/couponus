import styles from "./IssuedCouponList.module.css";
import useCouponService from "../../../services/couponService/useCouponService";

const IssuedCouponList = () => {
  const { couponService } = useCouponService();
  const { data: issuedCouponListData } = couponService.queryIssuedList();

  return (
    <div>
      <h1>발급한 쿠폰</h1>
      <div className={styles.wrapper}>
        {issuedCouponListData?.map((issuedCoupon) => (
          <div key={issuedCoupon.id}>
            {`${issuedCoupon.title}${" "}`}
            {`/ 발급일: ${issuedCoupon.issuedAt}${" "}`}
            {`/ 사용 여부: ${issuedCoupon.isUsed}${" "}`}
            {`/ 만료일: ${issuedCoupon.expiredAt}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuedCouponList;
